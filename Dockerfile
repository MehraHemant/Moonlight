# Build stage
FROM node:18.18.2-alpine as builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies
RUN npm ci --registry=https://registry.npmjs.org

# Copy the rest of the application code
COPY . .
COPY .env.build ./.env
# Build the Next.js application
RUN npm run build

# Prune development dependencies
RUN npm prune --production

# Final stage
FROM node:18.18.2-alpine

WORKDIR /app

# Copy production dependencies
COPY --from=builder /app/node_modules ./node_modules

# Copy build output
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY .env ./.env
COPY --from=builder /app/package.json ./package.json

# Expose the port the app runs on
# EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]