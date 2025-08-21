FROM node:22-alpine

WORKDIR /app

# Copy package management files
COPY package*.json ./
COPY turbo.json ./
COPY tsconfig.json ./

# Copy shared packages and configs
COPY shared/ ./shared/
COPY apps/nizam/ ./apps/nizam/

# Copy .env.example as .env for build-time environment
RUN cp apps/nizam/.env.example apps/nizam/.env

# Install dependencies
RUN npm ci

# Build the application using Turbo
RUN npm run build -- --filter=nizam...

WORKDIR /app/apps/nizam

# Expose the port (Next.js default is 3000)
EXPOSE 3001

# Start the production server
CMD ["npm", "start"] 