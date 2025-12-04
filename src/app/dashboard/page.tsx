"use client"

import Link from "next/link"
import Image from "next/image"
import { Plus, FolderOpen, Settings, LogOut } from "lucide-react"
import { useUser, useProjects, useIsAuthenticated } from "@/store/app-store"
import { APP_NAME } from "@/lib/constants"
import { cn } from "@/lib/utils"

/**
 * Project card component
 */
function ProjectCard({
    name,
    description,
    createdAt,
}: {
    name: string
    description: string | null
    createdAt: Date
}) {
    const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    })

    return (
        <div className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-slate-300 hover:shadow-md">
            <div className="mb-4 flex items-start justify-between">
                <div className="rounded-lg bg-slate-100 p-2">
                    <FolderOpen className="h-5 w-5 text-slate-600" />
                </div>
                <span className="text-xs text-slate-400">{formattedDate}</span>
            </div>
            <h3 className="mb-2 font-semibold text-slate-900 group-hover:text-slate-700">
                {name}
            </h3>
            <p className="text-sm text-slate-500 line-clamp-2">
                {description ?? "No description"}
            </p>
        </div>
    )
}

/**
 * Empty state component
 */
function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-16 text-center">
            <div className="mb-4 rounded-full bg-slate-100 p-4">
                <FolderOpen className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-slate-900">
                No projects yet
            </h3>
            <p className="mb-6 max-w-sm text-sm text-slate-500">
                Get started by creating your first project. Projects help you
                organize your work.
            </p>
            <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
            >
                <Plus className="h-4 w-4" />
                Create Project
            </button>
        </div>
    )
}

/**
 * Dashboard page - Example protected route
 * Uses Zustand store for state management
 */
export default function DashboardPage() {
    const user = useUser()
    const projects = useProjects()
    const isAuthenticated = useIsAuthenticated()

    // This page is protected by middleware, but we show a fallback just in case
    if (!isAuthenticated) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-slate-600">Loading...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="border-b border-slate-200 bg-white">
                <div className="container mx-auto flex items-center justify-between px-6 py-4">
                    <Link
                        href="/"
                        className="text-xl font-bold text-slate-900"
                    >
                        {APP_NAME}
                    </Link>
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                        >
                            <Settings className="h-5 w-5" />
                        </button>
                        <div className="flex items-center gap-3">
                            {user?.image && (
                                <Image
                                    src={user.image}
                                    alt={user.name ?? "User"}
                                    width={32}
                                    height={32}
                                    className="h-8 w-8 rounded-full"
                                />
                            )}
                            <span className="text-sm font-medium text-slate-700">
                                {user?.name ?? user?.email}
                            </span>
                        </div>
                        <Link
                            href="/api/auth/signout"
                            className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                        >
                            <LogOut className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-8">
                {/* Page Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Dashboard
                        </h1>
                        <p className="text-sm text-slate-500">
                            Manage your projects and settings
                        </p>
                    </div>
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
                    >
                        <Plus className="h-4 w-4" />
                        New Project
                    </button>
                </div>

                {/* Projects Grid */}
                {projects.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                name={project.name}
                                description={project.description}
                                createdAt={project.createdAt}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}
