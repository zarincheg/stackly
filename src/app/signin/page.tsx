"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { Loader2, Layers } from "lucide-react"
import AuthTabs from "@/components/auth/AuthTabs"
import EmailPasswordForm from "@/components/auth/EmailPasswordForm"
import { APP_NAME } from "@/lib/constants"

/**
 * Sign In Page
 * Provides authentication options:
 * - Email/Password sign in and sign up
 * - Google OAuth
 * - Email verification flow
 */
export default function SignInPage() {
    const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin")
    const [isGoogleLoading, setIsGoogleLoading] = useState(false)
    const [message, setMessage] = useState("")

    const handleGoogleSignIn = async () => {
        setIsGoogleLoading(true)
        try {
            await signIn("google", {
                redirectTo: "/",
            })
        } catch (error) {
            console.error("Google auth error:", error)
            setMessage("Failed to sign in with Google. Please try again.")
        } finally {
            setIsGoogleLoading(false)
        }
    }

    const handleAuthSuccess = () => {
        if (activeTab === "signup") {
            setMessage(
                "Account created successfully! Please check your email to verify your account."
            )
            setActiveTab("signin")
        }
    }

    const handleAuthError = (error: string) => {
        setMessage(error)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="mb-8 text-center">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <Layers className="h-8 w-8 text-slate-700" />
                        <span className="text-2xl font-bold text-slate-900">
                            {APP_NAME}
                        </span>
                    </Link>
                    <p className="mt-4 text-sm text-slate-600">
                        {activeTab === "signin"
                            ? "Sign in to your account to continue"
                            : "Create your account to get started"}
                    </p>
                </div>

                {/* Main Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
                    {/* Tab Navigation */}
                    <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />

                    {/* Success/Error Messages */}
                    {message && (
                        <div
                            className={`mb-6 rounded-lg border p-4 ${
                                message.includes("successfully")
                                    ? "border-green-200 bg-green-50 text-green-700"
                                    : "border-red-200 bg-red-50 text-red-700"
                            }`}
                        >
                            <p className="text-sm">{message}</p>
                        </div>
                    )}

                    {/* Email/Password Form */}
                    <EmailPasswordForm
                        mode={activeTab}
                        onSuccess={handleAuthSuccess}
                        onError={handleAuthError}
                    />

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-4 text-slate-500">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    {/* Google Sign In */}
                    <button
                        onClick={handleGoogleSignIn}
                        disabled={isGoogleLoading}
                        className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 font-medium text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:shadow-md disabled:cursor-not-allowed disabled:bg-slate-50"
                    >
                        {isGoogleLoading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            <Image
                                src="/google.svg"
                                alt="Google Logo"
                                width={20}
                                height={20}
                            />
                        )}
                        <span>Continue with Google</span>
                    </button>

                    {/* Additional Links */}
                    <div className="mt-8 space-y-2 text-center">
                        {activeTab === "signin" && (
                            <button
                                onClick={() =>
                                    setMessage(
                                        "Password reset feature coming soon!"
                                    )
                                }
                                className="text-sm text-slate-600 transition-colors hover:text-slate-900"
                            >
                                Forgot your password?
                            </button>
                        )}

                        <p className="text-xs text-slate-500">
                            By continuing, you agree to our{" "}
                            <Link
                                href="/terms"
                                className="text-slate-700 hover:text-slate-900"
                            >
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                                href="/privacy"
                                className="text-slate-700 hover:text-slate-900"
                            >
                                Privacy Policy
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <Link
                        href="/"
                        className="text-sm text-slate-500 transition-colors hover:text-slate-700"
                    >
                        ← Back to home
                    </Link>
                </div>
            </div>
        </div>
    )
}
