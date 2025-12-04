import { z } from "zod"

/**
 * Validation schema for sign in form
 */
export const signInSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
})

/**
 * Validation schema for sign up form
 */
export const signUpSchema = z
    .object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Please enter a valid email address"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(
                /(?=.*[a-z])/,
                "Password must contain at least one lowercase letter"
            )
            .regex(/(?=.*\d)/, "Password must contain at least one number"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    })

/**
 * Validation schema for forgot password form
 */
export const forgotPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
})

/**
 * Validation schema for reset password form
 */
export const resetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(
                /(?=.*[a-z])/,
                "Password must contain at least one lowercase letter"
            )
            .regex(/(?=.*\d)/, "Password must contain at least one number"),
        confirmPassword: z.string(),
        token: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    })

export type SignInFormData = z.infer<typeof signInSchema>
export type SignUpFormData = z.infer<typeof signUpSchema>
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>
