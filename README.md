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
- secrets.ENV_FILE
- secrets.GITHUB_TOKEN
- secrets.DEPLOY_SSH_SECRET_KEY

Variables:
- vars.HOST_PROD_USER
- vars.HOST_PROD_IP
- vars.HOST_PROD_SERVICE_PATH

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

