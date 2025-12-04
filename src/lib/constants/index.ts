/**
 * Application-wide constants
 * Customize these values for your specific application
 */

export const APP_NAME = "Stackly"
export const APP_DESCRIPTION = "NextJS-based boilerplate with auto deployment"

/**
 * Pagination defaults
 */
export const DEFAULT_PAGE_SIZE = 10
export const MAX_PAGE_SIZE = 100

/**
 * File upload limits
 */
export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
export const ALLOWED_FILE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "application/pdf",
]

/**
 * API response messages
 */
export const API_MESSAGES = {
    UNAUTHORIZED: "You must be logged in to perform this action",
    FORBIDDEN: "You do not have permission to perform this action",
    NOT_FOUND: "The requested resource was not found",
    VALIDATION_ERROR: "Invalid request data",
    INTERNAL_ERROR: "An unexpected error occurred",
    SUCCESS: "Operation completed successfully",
} as const

/**
 * Route paths
 */
export const ROUTES = {
    HOME: "/",
    SIGNIN: "/signin",
    DASHBOARD: "/dashboard",
    API: {
        PROJECTS: "/api/projects",
        UPLOAD: "/api/upload",
    },
} as const
