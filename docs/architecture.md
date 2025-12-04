# Stackly Architecture

This document provides a high-level overview of the Stackly boilerplate architecture. Stackly is a modern Next.js boilerplate/framework designed to serve as a foundation for web applications with authentication, database, and deployment ready out of the box.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, TailwindCSS
- **State:** Zustand
- **Database:** PostgreSQL with Prisma 7 (PG adapter)
- **Auth:** NextAuth v5 (Auth.js)
- **Icons:** Lucide React

## Core Framework: Next.js (App Router)

The application is built using Next.js with the App Router paradigm:

* **Pages & Layouts:** Defined in `src/app/`. Each route segment is a directory containing `page.tsx` (UI) and optionally `layout.tsx` (shared UI). The root layout (`src/app/layout.tsx`) is async, handling session authentication and data fetching for consistent state initialization.
* **Server Components & Client Components:** The app utilizes both. Server Components (`.tsx` files without the `'use client'` directive) handle data fetching and server rendering. Client Components (`'use client'`) handle interactivity and state management.
* **Unified State Architecture:** The async root layout fetches authentication and user data, then passes it to `AppDataProvider` for Zustand store initialization. This ensures every route has consistent state.
* **API Routes:** Backend endpoints are defined within `src/app/api/` using Route Handlers (`route.ts` files).

## Frontend

* **UI Components:** Reusable React components are located in `src/components/`. Components follow standard React practices, using hooks for state and effects.
* **Styling:** TailwindCSS is used for utility-first styling, configured via `tailwind.config.ts`. Global styles are in `src/app/globals.css`.
* **State Management:** Global client-side state is managed by Zustand as the single source of truth, defined in `src/store/app-store.ts`. The store holds UI state, user info, projects, and other application data.
* **Providers:** The `AppDataProvider` component (`src/components/providers/app-data-provider.tsx`) handles store initialization at the layout level with server-fetched data.
* **Icons:** Lucide React is used for iconography throughout the application.

## Backend (API Routes)

* **API Structure:** Endpoints are organized by resource under `src/app/api/` (e.g., `/api/projects`, `/api/upload`).
* **Request Handling:** Each `route.ts` file exports functions corresponding to HTTP methods (`GET`, `POST`, `PUT`, `DELETE`).
* **Database Interaction:** API routes interact with the PostgreSQL database via the Prisma client instance defined in `src/prisma.ts`.
* **Authentication:** Authentication and authorization are handled by NextAuth middleware. API routes can access session information to protect endpoints.
* **Pagination:** List endpoints support pagination with `page`, `limit`, and `search` query parameters.

### Example API Patterns

| Endpoint | Methods | Description |
|----------|---------|-------------|
| `/api/projects` | GET, POST | List (paginated) and create projects |
| `/api/projects/[id]` | GET, PUT, DELETE | Single project CRUD operations |
| `/api/upload` | POST | File upload handling (template) |

## Database

* **ORM:** Prisma 7 with the PostgreSQL adapter (`@prisma/adapter-pg`).
* **Schema:** The database schema is defined in `prisma/schema.prisma`.
* **Client:** A singleton Prisma client instance is exported from `src/prisma.ts` for use in API routes and server-side logic.
* **Migrations:** Database schema changes are managed using Prisma Migrate (`prisma/migrations/`).

## Authentication

* **Provider:** NextAuth v5 (`next-auth`) handles user authentication, configured in `src/auth.ts` and the `/api/auth/[...nextauth]/route.ts` handler.
* **Strategy:** Pre-configured with Google OAuth. Additional providers can be added easily.
* **Session Management:** NextAuth manages user sessions. The `auth()` helper provides session data in Server Components and API routes.
* **Middleware:** Route protection is handled via `middleware.ts` with configurable matchers.

## Route Protection

Routes are protected via NextAuth middleware (`middleware.ts`). The matcher configuration defines which routes require authentication:

```typescript
export const config = {
    matcher: [
        "/dashboard/:path*",
        "/api/projects/:path*",
        "/api/upload/:path*",
    ],
}
```

Add or remove paths to control which routes are protected. Unauthenticated users are redirected to `/signin`.

## State Management Architecture

The application uses a unified state management approach:

* **Server-Side Initialization:** The async root layout (`src/app/layout.tsx`) fetches the authentication session and user data using `auth()`.
* **Client-Side Hydration:** `AppDataProvider` receives server-fetched data as props and initializes the Zustand store.
* **Single Source of Truth:** All components use `useAppStore()` from the Zustand store, eliminating the need for multiple state systems.
* **Selector Hooks:** Optimized selector hooks (`useUser`, `useProjects`, etc.) prevent unnecessary re-renders.

### Data Flow

1. **Layout (Server)** → Fetches session + user data
2. **AppDataProvider (Client)** → Initializes Zustand store
3. **All Components** → Use consistent store state via `useAppStore()`

## Key Directories Summary

| Directory | Purpose |
|-----------|---------|
| `src/app/` | Core routing, page components, async layouts, and API routes |
| `src/components/` | Reusable React UI components |
| `src/components/providers/` | Context providers and store initializers |
| `src/store/` | Zustand global state management |
| `src/lib/` | Utility functions and configurations |
| `src/lib/utils/` | Common utility functions (`cn`, `formatDate`, etc.) |
| `src/lib/constants/` | Application-wide constants |
| `src/prisma.ts` | Prisma client instantiation |
| `src/auth.ts` | NextAuth configuration |
| `prisma/` | Prisma schema and migrations |
| `middleware.ts` | NextAuth route protection middleware |

## Utilities

The boilerplate includes common utility functions in `src/lib/utils/`:

* `cn()` - Combines class names with Tailwind class merging
* `formatDate()` - Formats dates to human-readable strings
* `delay()` - Promise-based delay utility
* `generateId()` - Random string ID generator
* `truncate()` - String truncation with ellipsis

## Constants

Application-wide constants are defined in `src/lib/constants/`:

* `APP_NAME`, `APP_DESCRIPTION` - Application metadata
* `DEFAULT_PAGE_SIZE`, `MAX_PAGE_SIZE` - Pagination defaults
* `MAX_FILE_SIZE`, `ALLOWED_FILE_TYPES` - File upload limits
* `API_MESSAGES` - Standardized API response messages
* `ROUTES` - Route path constants

## Getting Started

1. Clone the repository
2. Copy `.env.example` to `.env` and configure environment variables
3. Run `yarn install` to install dependencies
4. Run `yarn db:push` to sync the database schema
5. Run `yarn dev` to start the development server

## Customization

To customize Stackly for your application:

1. Update `APP_NAME` and `APP_DESCRIPTION` in `src/lib/constants/`
2. Modify the Prisma schema in `prisma/schema.prisma`
3. Add routes to the middleware matcher for protection
4. Extend the Zustand store with your application state
5. Add new API routes following the existing patterns
