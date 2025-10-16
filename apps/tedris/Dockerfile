FROM node:22-alpine

WORKDIR /app

# Copy package management files
COPY package*.json ./
COPY turbo.json ./
COPY tsconfig.json ./

# Copy shared packages and configs
COPY shared/ ./shared/
COPY apps/tedris/ ./apps/tedris/

# Copy .env.example as .env for build-time environment
RUN cp apps/tedris/.env.example apps/tedris/.env

# Install dependencies
RUN npm ci

# Build the application using Turbo
RUN npm run build -- --filter=tedris-web...

WORKDIR /app/apps/tedris

# Expose the port (Next.js default is 4000)
EXPOSE 4000

# Start the production server
CMD ["npm", "start"] 