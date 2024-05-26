# Install dependencies only when needed
FROM node:18-slim AS base

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat # if use alpine
WORKDIR /app

COPY .yarn ./.yarn
COPY .pnp.cjs .yarnrc.yml package.json yarn.lock* ./

# FROM base AS builder
WORKDIR /app

# COPY --from=deps /app/.yarn ./.yarn
# COPY --from=deps /app/.pnp.cjs ./pnp.cjs
COPY . .
RUN yarn set version berry
# .yarn/unplugged에 있는 파일들을 설치하기 위한 코드
RUN yarn install

ENV NODE_ENV production
# ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

FROM base AS runner
WORKDIR /app

# ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=base --chown=nextjs:nodejs /.next/standalone ./
COPY --from=base --chown=nextjs:nodejs /.next/static ./.next/static
COPY --from=base --chown=nextjs:nodejs /public ./public

USER nextjs
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]

