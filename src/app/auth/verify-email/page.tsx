import Link from "next/link"
import { CheckCircle, Mail, ArrowLeft, Layers } from "lucide-react"
import { APP_NAME } from "@/lib/constants"

/**
 * Email Verification Page
 * Shown after user registers with email/password
 * Instructs user to check their email for verification link
 */
export default function VerifyEmailPage() {
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
                </div>

                {/* Main Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl">
                    {/* Icon */}
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                        <Mail className="h-8 w-8 text-slate-600" />
                    </div>

                    {/* Title and Message */}
                    <h1 className="mb-4 text-2xl font-bold text-slate-900">
                        Check your email
                    </h1>

                    <p className="mb-6 text-slate-600">
                        We&apos;ve sent a verification link to your email
                        address. Please click the link in the email to verify
                        your account and complete the sign-up process.
                    </p>

                    {/* Additional Info */}
                    <div className="mb-6 rounded-lg bg-slate-50 p-4">
                        <div className="flex items-start gap-3">
                            <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                            <div className="text-left">
                                <p className="mb-1 text-sm font-medium text-slate-900">
                                    Why verify your email?
                                </p>
                                <ul className="space-y-1 text-xs text-slate-600">
                                    <li>• Secure your account</li>
                                    <li>• Enable password reset</li>
                                    <li>• Receive important updates</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Help Text */}
                    <p className="mb-6 text-sm text-slate-500">
                        Didn&apos;t receive the email? Check your spam folder or
                        contact support if you continue to have issues.
                    </p>

                    {/* Back to Sign In */}
                    <Link
                        href="/signin"
                        className="inline-flex items-center gap-2 text-slate-600 transition-colors hover:text-slate-900"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to sign in
                    </Link>
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
