### Stack
- TypeScript
- ESLint
- NextJS
- AuthJS
- TailwindCSS
- TypeORM with PostgreSQL driver
- Docker

### Infrastructure
- Dockerfile to make the app build
- GitHub actions workflow to build and deploy to the service via SSH and Docker Compose (conrainer repo on GitHub)
- Deploying only version tags with the prefix `v`

### Building variables
Secrets:
- secrets.ENV_FILE - should contain the full content for the .env file according to .env.local.example
- secrets.GITHUB_TOKEN
- secrets.DEPLOY_SSH_SECRET_KEY
- secrets.POSTGRES_PASSWORD - password for the PostgreSQL default user to launch the database service

Variables:
- vars.HOST_PROD_USER
- vars.HOST_PROD_IP
- vars.HOST_PROD_SERVICE_PATH
- vars.DOMAIN
- vars.APP_PORT
- vars.ALIAS

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Configuration

1. Setup variables and secrets for GitHub Actions in the repository settings
2. Copy .env file content to `secrets.ENV_FILE` that all that needed for the app configuration (and depends on your particular app based on this template)

