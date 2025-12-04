"use client"

import { create } from "zustand"

/**
 * User type from session
 */
interface User {
    id: string
    name: string | null
    email: string | null
    image: string | null
}

/**
 * Project type
 */
interface Project {
    id: string
    name: string
    description: string | null
    createdAt: Date
    updatedAt: Date
}

/**
 * Application state interface
 */
interface AppState {
    // User state
    user: User | null
    isAuthenticated: boolean

    // Projects state
    projects: Project[]
    selectedProjectId: string | null

    // UI state
    isLoading: boolean
    isSidebarOpen: boolean

    // Actions
    setUser: (user: User | null) => void
    setProjects: (projects: Project[]) => void
    setSelectedProjectId: (id: string | null) => void
    addProject: (project: Project) => void
    updateProject: (id: string, data: Partial<Project>) => void
    removeProject: (id: string) => void
    setIsLoading: (isLoading: boolean) => void
    toggleSidebar: () => void
    reset: () => void
}

/**
 * Initial state values
 */
const initialState = {
    user: null,
    isAuthenticated: false,
    projects: [],
    selectedProjectId: null,
    isLoading: false,
    isSidebarOpen: true,
}

/**
 * Zustand store for global application state
 * Single source of truth for client-side state management
 */
export const useAppStore = create<AppState>((set) => ({
    ...initialState,

    setUser: (user) =>
        set({
            user,
            isAuthenticated: user !== null,
        }),

    setProjects: (projects) => set({ projects }),

    setSelectedProjectId: (id) => set({ selectedProjectId: id }),

    addProject: (project) =>
        set((state) => ({
            projects: [...state.projects, project],
        })),

    updateProject: (id, data) =>
        set((state) => ({
            projects: state.projects.map((project) =>
                project.id === id ? { ...project, ...data } : project
            ),
        })),

    removeProject: (id) =>
        set((state) => ({
            projects: state.projects.filter((project) => project.id !== id),
            selectedProjectId:
                state.selectedProjectId === id ? null : state.selectedProjectId,
        })),

    setIsLoading: (isLoading) => set({ isLoading }),

    toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

    reset: () => set(initialState),
}))

/**
 * Selector hooks for common state slices
 * Use these for optimized re-renders
 */
export const useUser = () => useAppStore((state) => state.user)
export const useIsAuthenticated = () => useAppStore((state) => state.isAuthenticated)
export const useProjects = () => useAppStore((state) => state.projects)
export const useSelectedProject = () =>
    useAppStore((state) =>
        state.projects.find((p) => p.id === state.selectedProjectId) ?? null
    )
export const useIsLoading = () => useAppStore((state) => state.isLoading)
