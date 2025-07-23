# Environmental variables

To run this project (via CLI or Docker), you need the following environment variables:

```
NEXT_PUBLIC_CMS_API_URL=http://backend:3001/api
NODE_ENV=development
```

This assumes your backend server is running at the above URL.

# Running via CLI
1. Create a `.env.local` file in the project root.
2. Add the environment variables listed above.
3. Start the app:

> npm run dev

# Running via Docker (development)

1. Navigate to `Docker/Dev/` folder
2. Ensure a `.env.local` file is present in `Docker/Dev/` folder with the required variables mentioned above. and run:

> docker compose -f docker-compose-dev.yml up --build

This spins up the development container.

# Production
Production config lives in `Docker/Prod/`.

1. Navigate to `Docker/Prod/` folder.
2. Create an `.env.production` file in the root with following variable only (no need for Node_env variable as it is handled by Dockerfile):

```
NEXT_PUBLIC_CMS_API_URL=http://backend:3001/api
```

The main production build is meant to be run alongside the backend and database.
- The root-level `docker-compose.yml` handles this.
- It uses the `Docker/Prod/Dockerfile-prod`, so ensure `.env.production` is in place.

**Note**: The `Docker/Prod/docker-compose.yml` is only for testing the production build of the frontend without the backend. Use the root-level compose file for full-stack deployment.