import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"
import Credentials from "next-auth/providers/credentials"
import type { Provider } from "next-auth/providers"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"

/**
 * Validation schema for credentials login
 */
const credentialsSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

/**
 * Authentication providers configuration
 * - Google: OAuth provider
 * - Resend: Email verification provider
 * - Credentials: Email/password authentication
 */
const providers: Provider[] = [
    Google,
    Resend({
        from: process.env.RESEND_FROM_EMAIL || "noreply@example.com",
        apiKey: process.env.RESEND_API_KEY,
        name: "Email verification",
    }),
    Credentials({
        name: "credentials",
        credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
            try {
                const { email, password } = credentialsSchema.parse(credentials)

                // Find user by email
                const user = await prisma.user.findUnique({
                    where: { email },
                    include: { accounts: true },
                })

                if (!user) {
                    return null
                }

                // Check if user has a password (credentials account)
                const passwordAccount = user.accounts.find(
                    (acc) => acc.provider === "credentials"
                )
                if (!passwordAccount) {
                    return null
                }

                // Verify password (stored in providerAccountId)
                const isValidPassword = await bcrypt.compare(
                    password,
                    passwordAccount.providerAccountId
                )
                if (!isValidPassword) {
                    return null
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                    emailVerified: user.emailVerified,
                }
            } catch (error) {
                console.error("Auth error:", error)
                return null
            }
        },
    }),
]

/**
 * Provider map for UI rendering
 */
export const providerMap = providers.map((provider) => {
    if (typeof provider === "function") {
        const providerData = provider()
        return { id: providerData.id, name: providerData.name }
    } else {
        return { id: provider.id, name: provider.name }
    }
})

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: providers,
    trustHost: true,
    session: {
        strategy: "jwt", // Required for credentials provider compatibility
    },
    pages: {
        signIn: "/signin",
        verifyRequest: "/auth/verify-email",
    },
    events: {
        async createUser({ user }) {
            console.log("New user created:", user.email)
        },
    },
    callbacks: {
        async signIn({ user, account }) {
            // Allow all OAuth sign-ins
            if (account?.provider === "google") {
                return true
            }

            // For email verification - AuthJS handles this automatically
            if (account?.provider === "resend") {
                return true
            }

            // For credentials, user is already validated in authorize function
            if (account?.provider === "credentials") {
                return true
            }

            return true
        },
        async jwt({ token, user }) {
            // Persist user data in JWT token
            if (user) {
                token.id = user.id
                token.email = user.email
                token.name = user.name
                token.image = user.image
                if ("emailVerified" in user) {
                    token.emailVerified = user.emailVerified
                }
            }
            return token
        },
        session({ session, token }) {
            // Pass JWT token data to session
            if (token) {
                session.user.id = token.id as string
                session.user.email = token.email as string
                session.user.name = token.name as string
                session.user.image = token.image as string
            }
            return session
        },
    },
})
