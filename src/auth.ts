import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import type { Provider } from "next-auth/providers"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"

const providers: Provider[] = [
    Google
]

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
    providers: [Google],
    trustHost: true,
    pages: {
        signIn: "/signin",
    },
    callbacks: {
        session({ session, user }) {
            if (session.user) {
                session.user.id = user.id;
                session.user.image = user.image;
            }
            return session;
        }
    }
})