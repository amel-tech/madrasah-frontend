FROM node:22-alpine

WORKDIR /app

# Copy package management files
COPY package*.json ./
COPY turbo.json ./
COPY tsconfig.json ./

# Copy shared packages and configs
COPY shared/ ./shared/
COPY apps/landing/ ./apps/landing/

# Copy .env.example as .env for build-time environment
RUN cp apps/landing/.env.example apps/landing/.env

# Install dependencies
RUN npm ci

# Build the application using Turbo
RUN npm run build -- --filter=landing...

WORKDIR /app/apps/landing

# Expose the port (Next.js default is 4002)
EXPOSE 4003

# Start the production server
CMD ["npm", "start"] 