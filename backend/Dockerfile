FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY backend/package*.json ./backend/

# Install dependencies
RUN npm ci

# Copy source code and TypeScript config
COPY backend ./backend

# Build application
WORKDIR /app/backend
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install production dependencies only
COPY --from=builder /app/backend/package*.json ./
RUN npm ci --only=production

# Copy built application
COPY --from=builder /app/backend/dist ./dist
COPY --from=builder /app/backend/.env.example ./.env.example

EXPOSE 3001

CMD ["npm", "start"]
