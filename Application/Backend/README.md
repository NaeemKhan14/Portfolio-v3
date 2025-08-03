# Environmental variables

To run this project (via CLI or Docker), you need the following environment variables:

### Development `.env`
```
DATABASE_URI=mongodb://mongo:27017/portfolio-v3
PAYLOAD_SECRET=SECRET_KEY_HERE
CMS_API_URL=http://backend:3001/api
NODE_ENV=development
```

### Production `.env`
```
DATABASE_URI=mongodb://mongo:27017/portfolio-v3
PAYLOAD_SECRET=SECRET_KEY_HERE
CMS_API_URL=http://backend:3001/api
NODE_ENV=production
PAYLOAD_CONFIG_PATH=./src/app/payload.config.js
ADMIN_EMAIL=ADMIN_EMAIL@DOMAIN.COM
ADMIN_PASSWORD=ADMIN_PASSWORDHERE
DISABLE_ADMIN_SEED=false
```

This assumes your backend server is running at the above URL.

**Note**: `DISABLE_ADMIN_SEED` should be set to `false` on the first run to populate the data, then `true` on every consecutive run to disable data seeding as it should already be in the DB. 


# Running via CLI
1. Create a `.env.local` file in the project root.
2. Add the environment variables listed above.
3. Start the app:

> npm run dev

# Running via Docker (development)

1. Navigate to `Docker/Dev/` folder
2. Ensure a `.env` file is present in `Docker/Dev/` folder with the required variables mentioned above. and run:

> docker compose -f docker-compose-dev-backend.yml up --build

This spins up the development container.

# Production
Production config lives in `Docker/Prod/`.

1. Navigate to `Docker/Prod/` folder.
2. Create an `.env` file in the root with following variable only:

The main production build is meant to be run alongside the backend and database.
- The root-level `docker-compose.yml` handles this.
- It uses the `Docker/Prod/Dockerfile-prod`, so ensure `.env` is in place.

**Note**: The `Docker/Prod/docker-compose-backend-prod.yml` is only for testing the production build of the backend. Use the root-level compose file for full-stack deployment.