![stackly (1)](https://github.com/user-attachments/assets/43561008-d22f-4ec7-b4e8-6bbbf09603a3)

### Stack Out-of-the-Box
- TypeScript
- ESLint
- NextJS
- AuthJS
- TailwindCSS
- TypeORM
- PostgreSQL
- Docker

## Getting Started

### Development

#### Prerequisites
You must have Docker installed locally with a default [PostgreSQL](https://hub.docker.com/_/postgres) container.

#### Configure environment variables
For the local development copy `.env.local.example` to `.env.local` and set the following variables.
1. `AUTH_SECRET` it's a secret for [AuthJS](https://authjs.dev/) that can be generated via `npx auth secret` or `openssl rand -base64 33`
2. `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` is for Google OAuth credentials that you can configure and obtain in [Google Cloud Console](https://console.cloud.google.com/)

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

#### Configure environment variables

Setup variables in the repository settings:
1. `HOST_PROD_IP` - IP address of the target server
2. `HOST_PROD_USER` - a server user with appropriate access to copy files and launch docker containers
3. `HOST_PROD_SERVICE_PATH` - path to directory for docker compose file. The app will be launched from this path via `docker compose`
4. `DOMAIN` - app domain name
5. `APP_PORT` - an internal port that will be used by Traefik
6. `ALIAS` - app alias for container name and other internal use
7. `LE_EMAIL` - an email address for the Let's Encrypt SSL certificate that will be used by Traefik

#### Configure secrets
For deployment, you should put all the contents of the `.env` file into the `ENV_FILE` secret variable for GitHub Actions.

Next, add the SSH key of your server as a secret variable `DEPLOY_SSH_SECRET_KEY` as well.

For GitHub Packages you need to add your GitHub token with read and write access for packages to the `GITHUB_TOKEN` secret variable.

Also add your PostgreSQL password to the `POSTGRES_PASSWORD` secret variable.

#### Create and publish the release

To run the build and deploy process, you need to create a release with a git tag named with a `v` prefix.
