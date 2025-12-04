import Link from "next/link"
import { auth } from "@/auth"
import { ArrowRight, Layers, Shield, Zap } from "lucide-react"
import { APP_NAME } from "@/lib/constants"

/**
 * Feature card component
 */
function FeatureCard({
    icon: Icon,
    title,
    description,
}: {
    icon: React.ComponentType<{ className?: string }>
    title: string
    description: string
}) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-4 inline-flex rounded-lg bg-slate-100 p-3">
                <Icon className="h-6 w-6 text-slate-700" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-slate-900">{title}</h3>
            <p className="text-sm text-slate-600">{description}</p>
        </div>
    )
}

export default async function HomePage() {
    const session = await auth()
    const isAuthenticated = !!session?.user

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            {/* Header */}
            <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
                <div className="container mx-auto flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-2">
                        <Layers className="h-6 w-6 text-slate-700" />
                        <span className="text-xl font-bold text-slate-900">
                            {APP_NAME}
                        </span>
                    </div>
                    <nav>
                        {isAuthenticated ? (
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
                            >
                                Dashboard
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        ) : (
                            <Link
                                href="/signin"
                                className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
                            >
                                Sign In
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        )}
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="container mx-auto px-6 py-24 text-center">
                <h1 className="mb-6 text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
                    Build faster with{" "}
                    <span className="text-slate-600">{APP_NAME}</span>
                </h1>
                <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-600">
                    A modern Next.js boilerplate with authentication, database,
                    and deployment ready out of the box. Start building your app
                    in minutes, not days.
                </p>
                <div className="flex items-center justify-center gap-4">
                    <Link
                        href={isAuthenticated ? "/dashboard" : "/signin"}
                        className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800"
                    >
                        Get Started
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                    >
                        View on GitHub
                    </a>
                </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-6 py-16">
                <h2 className="mb-12 text-center text-3xl font-bold text-slate-900">
                    Everything you need to get started
                </h2>
                <div className="grid gap-6 md:grid-cols-3">
                    <FeatureCard
                        icon={Shield}
                        title="Authentication Ready"
                        description="Pre-configured NextAuth.js with Google OAuth. Add more providers in minutes with built-in session management."
                    />
                    <FeatureCard
                        icon={Layers}
                        title="Database & ORM"
                        description="Prisma ORM with PostgreSQL adapter. Type-safe database queries with migrations and seeding support."
                    />
                    <FeatureCard
                        icon={Zap}
                        title="Modern Stack"
                        description="Next.js 16, React 19, TypeScript, TailwindCSS, and Zustand. All the modern tools configured and ready."
                    />
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-200 bg-white">
                <div className="container mx-auto px-6 py-8 text-center text-sm text-slate-600">
                    <p>
                        Built with {APP_NAME} — A modern Next.js boilerplate
                    </p>
                </div>
            </footer>
        </main>
    )
}
