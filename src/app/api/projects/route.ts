import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/prisma"
import { API_MESSAGES, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from "@/lib/constants"

/**
 * GET /api/projects
 * Retrieves paginated list of projects for the authenticated user
 *
 * Query params:
 * - page: Page number (default: 1)
 * - limit: Items per page (default: 10, max: 100)
 * - search: Optional search term for project name
 */
export async function GET(request: NextRequest) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: API_MESSAGES.UNAUTHORIZED },
                { status: 401 }
            )
        }

        const searchParams = request.nextUrl.searchParams
        const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10))
        const limit = Math.min(
            MAX_PAGE_SIZE,
            Math.max(1, parseInt(searchParams.get("limit") ?? String(DEFAULT_PAGE_SIZE), 10))
        )
        const search = searchParams.get("search") ?? ""

        const skip = (page - 1) * limit

        // Build where clause
        const where = {
            ownerId: session.user.id,
            ...(search && {
                name: {
                    contains: search,
                    mode: "insensitive" as const,
                },
            }),
        }

        // Fetch projects and total count in parallel
        const [projects, total] = await Promise.all([
            prisma.project.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
            }),
            prisma.project.count({ where }),
        ])

        const totalPages = Math.ceil(total / limit)

        return NextResponse.json({
            data: projects,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1,
            },
        })
    } catch (error) {
        console.error("GET /api/projects error:", error)
        return NextResponse.json(
            { error: API_MESSAGES.INTERNAL_ERROR },
            { status: 500 }
        )
    }
}

/**
 * POST /api/projects
 * Creates a new project for the authenticated user
 *
 * Body:
 * - name: Project name (required)
 * - description: Project description (optional)
 */
export async function POST(request: NextRequest) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: API_MESSAGES.UNAUTHORIZED },
                { status: 401 }
            )
        }

        const body = await request.json()
        const { name, description } = body

        // Validate required fields
        if (!name || typeof name !== "string" || name.trim().length === 0) {
            return NextResponse.json(
                { error: "Project name is required" },
                { status: 400 }
            )
        }

        const project = await prisma.project.create({
            data: {
                name: name.trim(),
                description: description?.trim() ?? null,
                ownerId: session.user.id,
            },
        })

        return NextResponse.json({ data: project }, { status: 201 })
    } catch (error) {
        console.error("POST /api/projects error:", error)
        return NextResponse.json(
            { error: API_MESSAGES.INTERNAL_ERROR },
            { status: 500 }
        )
    }
}
