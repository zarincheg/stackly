![stackly_v2](https://github.com/user-attachments/assets/789bb590-48dc-4b4c-8abe-d375335b49fc)

## Stack Out-of-the-Box
- TypeScript
- ESLint
- NextJS
- AuthJS
- TailwindCSS
- Prisma (ORM)
- PostgreSQL
- Docker
- Traefik (reverse proxy)
- GitHub Actions (CI/CD)
- Let's Encrypt (SSL certificates)

## Getting Started

### Development

#### Prerequisites
You must have Docker installed locally with a default [PostgreSQL](https://hub.docker.com/_/postgres) container.

#### Configure environment variables
For the local development copy `.env.local.example` to `.env.local` and set the following variables.
1. `AUTH_SECRET` it's a secret for [AuthJS](https://authjs.dev/) that can be generated via `npx auth secret` or `openssl rand -base64 33`
2. `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` is for Google OAuth credentials that you can configure and obtain in [Google Cloud Console](https://console.cloud.google.com/)
3. `AUTH_URL` is a URL of the application that will be used by AuthJS for redirecting the user after login
4. `DATABASE_URL` is a connection string for the PostgreSQL database. You can use the following example:
```
postgresql://postgres:postgres@localhost:5432/stackly?schema=public
```


#### Launch application
First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Deployment

#### Prerequisites
You must have a Linux server with Docker installed that is accessible via SSH with key-based authentication.

#### Configure environment variables for GitHub Actions

Setup variables in the repository settings:
1. `HOST_PROD_IP` - IP address of the target server
2. `HOST_PROD_USER` - A server user with appropriate access to copy files and launch docker containers
3. `HOST_PROD_SERVICE_PATH` - Path to directory for docker compose file. The app will be launched from this path via `docker compose`
4. `DOMAIN` - App domain name
5. `APP_PORT` - An internal port that will be used by Traefik
6. `ALIAS` - App alias for container name and other internal use (database name, etc.)
7. `LE_EMAIL` - An email address for the Let's Encrypt SSL certificate that will be used by Traefik

#### Configure secrets
For deployment, you should put all the contents of the `.env` file into the `ENV_FILE` secret variable for GitHub Actions.

Next, add the SSH key of your server as a secret variable `DEPLOY_SSH_SECRET_KEY` as well.

For GitHub Packages you need to add your GitHub token with read and write access for packages to the `GITHUB_TOKEN` secret variable.

Also add your PostgreSQL password to the `POSTGRES_PASSWORD` secret variable.

#### Create and publish the release

To run the build and deploy process, you need to create a release with a git tag named with a `v` prefix.

## Configuration files

### GitHub Actions
- `build-deploy.yml` - Build and deploy the application to the production server
- `./github/actions/docker-compose-config` - Action for uploading the docker compose file to the production server
- `./github/actions/ssh` - Action for SSH connection to the production server

### Environment Variables
- `.env.local.example` - Template for local development environment variables
- `.env.local` - Local development configuration (not committed to repository)
- `.env` - Production environment configuration (stored as GitHub secret)

### Prisma
- `schema.prisma` - Prisma schema for the application
- `prisma/schema.prisma` - Prisma schema for the application
- `prisma/migrations` - Prisma migrations for the application
- `prisma/seed.ts` - Prisma seed for the application

### Docker
- `docker-compose.yml` - Main production configuration for application services
- `docker-compose-dev.yml` - Development-specific Docker configuration with hot-reloading
- `docker-compose-traefik.yml` - Traefik reverse proxy configuration for SSL and routing

