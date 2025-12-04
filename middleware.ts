import { auth } from "@/auth"
import { NextResponse } from "next/server"

/**
 * Use Node.js runtime instead of Edge runtime
 * Required because Prisma client uses Node.js-specific APIs
 */
export const runtime = "nodejs"

/**
 * NextAuth middleware for route protection
 *
 * This middleware:
 * 1. Protects routes defined in the matcher config
 * 2. Redirects unauthenticated users to the sign-in page
 * 3. Allows authenticated users to proceed
 *
 * To protect a route, add it to the matcher array below.
 */
export default auth((req) => {
    const isAuthenticated = !!req.auth

    // If user is not authenticated and trying to access protected route
    if (!isAuthenticated) {
        const signInUrl = new URL("/signin", req.url)
        // Add callback URL so user returns to intended page after sign in
        signInUrl.searchParams.set("callbackUrl", req.url)
        return NextResponse.redirect(signInUrl)
    }

    return NextResponse.next()
})

/**
 * Matcher configuration
 *
 * Define which routes require authentication.
 * Add or remove paths as needed for your application.
 *
 * Examples:
 * - "/dashboard" - Exact match
 * - "/dashboard/:path*" - Match dashboard and all sub-routes
 * - "/api/projects/:path*" - Protect API routes
 */
export const config = {
    matcher: [
        // Protected pages
        "/dashboard/:path*",
        // Protected API routes (except auth routes which handle their own auth)
        "/api/projects/:path*",
        "/api/upload/:path*",
    ],
}
