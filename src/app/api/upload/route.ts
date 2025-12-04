import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { API_MESSAGES, MAX_FILE_SIZE, ALLOWED_FILE_TYPES } from "@/lib/constants"

/**
 * POST /api/upload
 * Handles file uploads
 *
 * This is a template for file upload handling.
 * In production, you would typically:
 * 1. Upload to cloud storage (S3, Cloudflare R2, etc.)
 * 2. Store the file URL in your database
 * 3. Return the URL to the client
 *
 * FormData:
 * - file: The file to upload (required)
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

        const formData = await request.formData()
        const file = formData.get("file") as File | null

        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            )
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                {
                    error: `File size exceeds maximum allowed size of ${MAX_FILE_SIZE / 1024 / 1024}MB`,
                },
                { status: 400 }
            )
        }

        // Validate file type
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            return NextResponse.json(
                {
                    error: `File type '${file.type}' is not allowed. Allowed types: ${ALLOWED_FILE_TYPES.join(", ")}`,
                },
                { status: 400 }
            )
        }

        // Get file data
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Generate a unique filename
        const timestamp = Date.now()
        const extension = file.name.split(".").pop() ?? "bin"
        const filename = `${session.user.id}-${timestamp}.${extension}`

        /**
         * IMPORTANT: This is where you would upload to your storage provider
         *
         * Example with S3:
         * ```typescript
         * import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
         *
         * const s3 = new S3Client({ region: process.env.AWS_REGION })
         * await s3.send(new PutObjectCommand({
         *   Bucket: process.env.S3_BUCKET,
         *   Key: `uploads/${filename}`,
         *   Body: buffer,
         *   ContentType: file.type,
         * }))
         *
         * const url = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/${filename}`
         * ```
         *
         * Example with Cloudflare R2:
         * ```typescript
         * import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
         *
         * const r2 = new S3Client({
         *   region: "auto",
         *   endpoint: process.env.R2_ENDPOINT,
         *   credentials: {
         *     accessKeyId: process.env.R2_ACCESS_KEY_ID,
         *     secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
         *   },
         * })
         *
         * await r2.send(new PutObjectCommand({
         *   Bucket: process.env.R2_BUCKET,
         *   Key: `uploads/${filename}`,
         *   Body: buffer,
         *   ContentType: file.type,
         * }))
         * ```
         */

        // For now, we'll just return the file metadata
        // Replace this with actual upload logic in production
        return NextResponse.json({
            data: {
                filename,
                originalName: file.name,
                size: file.size,
                type: file.type,
                // url: "https://your-storage-url.com/uploads/" + filename,
                message:
                    "File received. Implement storage provider integration for production.",
            },
        })
    } catch (error) {
        console.error("POST /api/upload error:", error)
        return NextResponse.json(
            { error: API_MESSAGES.INTERNAL_ERROR },
            { status: 500 }
        )
    }
}
