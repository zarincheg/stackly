"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { useAppStore } from "@/store/app-store"

/**
 * User data passed from server
 */
interface UserData {
    id: string
    name: string | null
    email: string | null
    image: string | null
}

/**
 * Project data passed from server
 */
interface ProjectData {
    id: string
    name: string
    description: string | null
    createdAt: Date
    updatedAt: Date
}

/**
 * Props for AppDataProvider
 */
interface AppDataProviderProps {
    children: ReactNode
    user: UserData | null
    projects?: ProjectData[]
}

/**
 * Client-side provider that initializes Zustand store with server-fetched data
 * This component bridges server-side data fetching with client-side state management
 *
 * Usage in layout.tsx:
 * ```tsx
 * const session = await auth()
 * const projects = session?.user ? await getProjects(session.user.id) : []
 *
 * return (
 *   <AppDataProvider user={session?.user ?? null} projects={projects}>
 *     {children}
 *   </AppDataProvider>
 * )
 * ```
 */
export function AppDataProvider({
    children,
    user,
    projects = [],
}: AppDataProviderProps): ReactNode {
    const isInitialized = useRef(false)
    const setUser = useAppStore((state) => state.setUser)
    const setProjects = useAppStore((state) => state.setProjects)

    useEffect(() => {
        // Only initialize once per mount
        if (isInitialized.current) return
        isInitialized.current = true

        // Initialize store with server data
        setUser(user)
        setProjects(projects)
    }, [user, projects, setUser, setProjects])

    return <>{children}</>
}
