# Dockerfile

# Step 1: Install dependencies and build the app
FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

# Generate standalone production build
RUN npm run build

# Step 2: Create a lightweight image for running the app
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Only copy necessary files from builder
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# If you use next.config.js or .env
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/.env ./

EXPOSE 3000

CMD ["node", "server.js"]
