# Use the official Node.js 18 image as a base
FROM node:18-alpine AS base

# Set the working directory
WORKDIR /app

# Install corepack and enable it
RUN npm install -g corepack && corepack enable

# Install Yarn Berry (v2 or v3)
# RUN corepack prepare yarn@stable --activate
# .yarn/unplugged에 있는 파일들을 설치하기 위한 코드
RUN yarn set version berry

# Copy necessary files
COPY .yarn .yarn
COPY .pnp.cjs .pnp.cjs
COPY .pnp.loader.mjs .pnp.loader.mjs
COPY package.json yarn.lock .yarnrc.yml ./

# Install dependencies using Yarn Berry
RUN yarn install --immutable

# Copy all project files
COPY . .

# Build the Next.js project using standalone mode
RUN yarn build

# Create a lightweight image for production
FROM node:18-alpine AS runner

# Set the working directory
WORKDIR /app

# Copy the built project from the base stage
COPY --from=base /app/.next/standalone ./
COPY --from=base /app/public ./public
COPY --from=base /app/.next/static ./.next/static

# Install production dependencies
# RUN yarn install --production

# Set environment variables
# ENV NODE_ENV=production

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js application
CMD ["node", "server.js"]
