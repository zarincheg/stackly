import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/prisma"
import { API_MESSAGES } from "@/lib/constants"

interface RouteParams {
    params: Promise<{ id: string }>
}

/**
 * GET /api/projects/[id]
 * Retrieves a single project by ID
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: API_MESSAGES.UNAUTHORIZED },
                { status: 401 }
            )
        }

        const { id } = await params

        const project = await prisma.project.findUnique({
            where: { id },
        })

        if (!project) {
            return NextResponse.json(
                { error: API_MESSAGES.NOT_FOUND },
                { status: 404 }
            )
        }

        // Check ownership
        if (project.ownerId !== session.user.id) {
            return NextResponse.json(
                { error: API_MESSAGES.FORBIDDEN },
                { status: 403 }
            )
        }

        return NextResponse.json({ data: project })
    } catch (error) {
        console.error("GET /api/projects/[id] error:", error)
        return NextResponse.json(
            { error: API_MESSAGES.INTERNAL_ERROR },
            { status: 500 }
        )
    }
}

/**
 * PUT /api/projects/[id]
 * Updates a project by ID
 *
 * Body:
 * - name: Project name (optional)
 * - description: Project description (optional)
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: API_MESSAGES.UNAUTHORIZED },
                { status: 401 }
            )
        }

        const { id } = await params

        // Check if project exists and belongs to user
        const existingProject = await prisma.project.findUnique({
            where: { id },
        })

        if (!existingProject) {
            return NextResponse.json(
                { error: API_MESSAGES.NOT_FOUND },
                { status: 404 }
            )
        }

        if (existingProject.ownerId !== session.user.id) {
            return NextResponse.json(
                { error: API_MESSAGES.FORBIDDEN },
                { status: 403 }
            )
        }

        const body = await request.json()
        const { name, description } = body

        // Build update data
        const updateData: { name?: string; description?: string | null } = {}

        if (name !== undefined) {
            if (typeof name !== "string" || name.trim().length === 0) {
                return NextResponse.json(
                    { error: "Project name cannot be empty" },
                    { status: 400 }
                )
            }
            updateData.name = name.trim()
        }

        if (description !== undefined) {
            updateData.description = description?.trim() ?? null
        }

        const project = await prisma.project.update({
            where: { id },
            data: updateData,
        })

        return NextResponse.json({ data: project })
    } catch (error) {
        console.error("PUT /api/projects/[id] error:", error)
        return NextResponse.json(
            { error: API_MESSAGES.INTERNAL_ERROR },
            { status: 500 }
        )
    }
}

/**
 * DELETE /api/projects/[id]
 * Deletes a project by ID
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: API_MESSAGES.UNAUTHORIZED },
                { status: 401 }
            )
        }

        const { id } = await params

        // Check if project exists and belongs to user
        const existingProject = await prisma.project.findUnique({
            where: { id },
        })

        if (!existingProject) {
            return NextResponse.json(
                { error: API_MESSAGES.NOT_FOUND },
                { status: 404 }
            )
        }

        if (existingProject.ownerId !== session.user.id) {
            return NextResponse.json(
                { error: API_MESSAGES.FORBIDDEN },
                { status: 403 }
            )
        }

        await prisma.project.delete({
            where: { id },
        })

        return NextResponse.json({ message: API_MESSAGES.SUCCESS })
    } catch (error) {
        console.error("DELETE /api/projects/[id] error:", error)
        return NextResponse.json(
            { error: API_MESSAGES.INTERNAL_ERROR },
            { status: 500 }
        )
    }
}
