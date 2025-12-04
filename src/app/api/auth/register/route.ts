import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/prisma"
import { hashPassword } from "@/lib/auth/password"
import { signUpSchema } from "@/lib/auth/validation"
import { signIn } from "@/auth"

/**
 * POST /api/auth/register
 * Registers a new user with email and password
 *
 * Body:
 * - name: User's full name
 * - email: User's email address
 * - password: User's password (min 8 chars, lowercase, number)
 * - confirmPassword: Password confirmation
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, email, password } = signUpSchema.parse(body)

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 400 }
            )
        }

        // Hash password
        const hashedPassword = await hashPassword(password)

        // Create user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                emailVerified: null, // Will be set after email verification
            },
        })

        // Create credentials account for password login
        // Password is stored as hashed value in providerAccountId
        await prisma.account.create({
            data: {
                userId: user.id,
                type: "credentials",
                provider: "credentials",
                providerAccountId: hashedPassword,
            },
        })

        // Send verification email using Resend provider
        // This triggers AuthJS to send verification email automatically
        try {
            await signIn("resend", {
                email: user.email,
                redirect: false,
            })
        } catch (error) {
            console.error("Failed to send verification email:", error)
            // Don't fail registration if email fails - user can request resend
        }

        return NextResponse.json({
            message:
                "User created successfully. Please check your email to verify your account.",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        })
    } catch (error) {
        console.error("Registration error:", error)

        if (error instanceof Error && error.name === "ZodError") {
            return NextResponse.json(
                { error: "Invalid input data", details: error },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}
