"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { Eye, EyeOff, Loader2, Mail, Lock, User } from "lucide-react"
import {
    signInSchema,
    signUpSchema,
    type SignInFormData,
    type SignUpFormData,
} from "@/lib/auth/validation"

interface EmailPasswordFormProps {
    mode: "signin" | "signup"
    onSuccess?: () => void
    onError?: (error: string) => void
}

/**
 * Email/Password authentication form component
 * Handles both Sign In and Sign Up flows
 */
export default function EmailPasswordForm({
    mode,
    onSuccess,
    onError,
}: EmailPasswordFormProps) {
    const isSignUp = mode === "signup"

    if (isSignUp) {
        return <SignUpForm onSuccess={onSuccess} onError={onError} />
    } else {
        return <SignInForm onSuccess={onSuccess} onError={onError} />
    }
}

/**
 * Sign In Form Component
 */
function SignInForm({
    onSuccess,
    onError,
}: {
    onSuccess?: () => void
    onError?: (error: string) => void
}) {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
    })

    const onSubmit = async (data: SignInFormData) => {
        setIsLoading(true)

        try {
            const result = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            })

            if (result?.error) {
                throw new Error("Invalid email or password")
            }

            if (result?.ok) {
                onSuccess?.()
                window.location.href = "/"
            }
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "An error occurred"
            onError?.(errorMessage)
            setError("root", { message: errorMessage })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email field */}
            <div>
                <label
                    htmlFor="signin-email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                >
                    Email Address
                </label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                        {...register("email")}
                        type="email"
                        id="signin-email"
                        className={`w-full rounded-lg border py-3 pl-10 pr-4 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-slate-500 ${
                            errors.email ? "border-red-500" : "border-slate-200"
                        }`}
                        placeholder="Enter your email"
                    />
                </div>
                {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.email.message}
                    </p>
                )}
            </div>

            {/* Password field */}
            <div>
                <label
                    htmlFor="signin-password"
                    className="mb-2 block text-sm font-medium text-slate-700"
                >
                    Password
                </label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                        {...register("password")}
                        type={showPassword ? "text" : "password"}
                        id="signin-password"
                        className={`w-full rounded-lg border py-3 pl-10 pr-12 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-slate-500 ${
                            errors.password
                                ? "border-red-500"
                                : "border-slate-200"
                        }`}
                        placeholder="Enter your password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                        {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                        ) : (
                            <Eye className="h-5 w-5" />
                        )}
                    </button>
                </div>
                {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.password.message}
                    </p>
                )}
            </div>

            {/* Error message */}
            {errors.root && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                    <p className="text-sm text-red-600">{errors.root.message}</p>
                </div>
            )}

            {/* Submit button */}
            <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 font-medium text-white transition-all duration-200 hover:bg-slate-800 disabled:bg-slate-400"
            >
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                Sign In
            </button>
        </form>
    )
}

/**
 * Sign Up Form Component
 */
function SignUpForm({
    onSuccess,
    onError,
}: {
    onSuccess?: () => void
    onError?: (error: string) => void
}) {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset,
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
    })

    const onSubmit = async (data: SignUpFormData) => {
        setIsLoading(true)

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || "Registration failed")
            }

            onSuccess?.()
            reset()
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "An error occurred"
            onError?.(errorMessage)
            setError("root", { message: errorMessage })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name field */}
            <div>
                <label
                    htmlFor="signup-name"
                    className="mb-2 block text-sm font-medium text-slate-700"
                >
                    Full Name
                </label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                        {...register("name")}
                        type="text"
                        id="signup-name"
                        className={`w-full rounded-lg border py-3 pl-10 pr-4 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-slate-500 ${
                            errors.name ? "border-red-500" : "border-slate-200"
                        }`}
                        placeholder="Enter your full name"
                    />
                </div>
                {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.name.message}
                    </p>
                )}
            </div>

            {/* Email field */}
            <div>
                <label
                    htmlFor="signup-email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                >
                    Email Address
                </label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                        {...register("email")}
                        type="email"
                        id="signup-email"
                        className={`w-full rounded-lg border py-3 pl-10 pr-4 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-slate-500 ${
                            errors.email ? "border-red-500" : "border-slate-200"
                        }`}
                        placeholder="Enter your email"
                    />
                </div>
                {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.email.message}
                    </p>
                )}
            </div>

            {/* Password field */}
            <div>
                <label
                    htmlFor="signup-password"
                    className="mb-2 block text-sm font-medium text-slate-700"
                >
                    Password
                </label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                        {...register("password")}
                        type={showPassword ? "text" : "password"}
                        id="signup-password"
                        className={`w-full rounded-lg border py-3 pl-10 pr-12 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-slate-500 ${
                            errors.password
                                ? "border-red-500"
                                : "border-slate-200"
                        }`}
                        placeholder="Create a strong password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                        {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                        ) : (
                            <Eye className="h-5 w-5" />
                        )}
                    </button>
                </div>
                {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.password.message}
                    </p>
                )}
            </div>

            {/* Confirm Password field */}
            <div>
                <label
                    htmlFor="signup-confirmPassword"
                    className="mb-2 block text-sm font-medium text-slate-700"
                >
                    Confirm Password
                </label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                        {...register("confirmPassword")}
                        type={showConfirmPassword ? "text" : "password"}
                        id="signup-confirmPassword"
                        className={`w-full rounded-lg border py-3 pl-10 pr-12 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-slate-500 ${
                            errors.confirmPassword
                                ? "border-red-500"
                                : "border-slate-200"
                        }`}
                        placeholder="Confirm your password"
                    />
                    <button
                        type="button"
                        onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                        {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5" />
                        ) : (
                            <Eye className="h-5 w-5" />
                        )}
                    </button>
                </div>
                {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.confirmPassword.message}
                    </p>
                )}
            </div>

            {/* Error message */}
            {errors.root && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                    <p className="text-sm text-red-600">{errors.root.message}</p>
                </div>
            )}

            {/* Submit button */}
            <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 font-medium text-white transition-all duration-200 hover:bg-slate-800 disabled:bg-slate-400"
            >
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                Create Account
            </button>

            {/* Password strength info */}
            <div className="space-y-1 text-xs text-slate-500">
                <p>Password must contain:</p>
                <ul className="ml-2 list-inside list-disc space-y-1">
                    <li>At least 8 characters</li>
                    <li>One lowercase letter</li>
                    <li>One number</li>
                </ul>
            </div>
        </form>
    )
}
