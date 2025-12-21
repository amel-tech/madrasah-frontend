FROM node:22-alpine

WORKDIR /app

# Copy package management files
COPY package*.json ./
COPY turbo.json ./
COPY tsconfig.json ./

# Copy shared packages and configs
COPY shared/ ./shared/
COPY apps/nazir/ ./apps/nazir/

# Copy .env.example as .env for build-time environment
RUN cp apps/nazir/.env.example apps/nazir/.env

# Install dependencies
RUN npm ci

# Build the application using Turbo
RUN npm run build -- --filter=nazir-web...

WORKDIR /app/apps/nazir

# Expose the port (Next.js default is 4002)
EXPOSE 4002

# Start the production server
CMD ["npm", "start"] 