import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import { auth } from "@/auth"
import { prisma } from "@/prisma"
import { AppDataProvider } from "@/components/providers/app-data-provider"
import { APP_NAME, APP_DESCRIPTION } from "@/lib/constants"
import "./globals.css"

const font = DM_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: APP_NAME,
    description: APP_DESCRIPTION,
}

/**
 * Fetches user's projects from database
 */
async function getUserProjects(userId: string) {
    const projects = await prisma.project.findMany({
        where: { ownerId: userId },
        orderBy: { createdAt: "desc" },
    })
    return projects
}

/**
 * Root layout with async data fetching
 * Initializes authentication session and user data for the entire app
 */
export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    // Fetch session server-side
    const session = await auth()

    // Fetch user's projects if authenticated
    const projects = session?.user?.id
        ? await getUserProjects(session.user.id)
        : []

    // Prepare user data for client
    const userData = session?.user
        ? {
              id: session.user.id ?? "",
              name: session.user.name ?? null,
              email: session.user.email ?? null,
              image: session.user.image ?? null,
          }
        : null

    return (
        <html lang="en">
            <body className={font.className}>
                <AppDataProvider user={userData} projects={projects}>
                    {children}
                </AppDataProvider>
            </body>
        </html>
    )
}
