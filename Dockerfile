# TEMP-NEXUS-BYPASS: original line below, restore once Nexus DNS is fixed
# FROM docker.sebaoffice.ir/library/node:22-alpine AS base
FROM node:22-alpine AS base

FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN npm i -g npm@11.6.0

COPY package.json package-lock.json* ./
COPY prisma ./prisma/

RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set build-time environment variables for NEXT_PUBLIC_* (embedded at build time)
ARG NEXT_PUBLIC_BASE_PATH=""
ENV NEXT_PUBLIC_BASE_PATH=$NEXT_PUBLIC_BASE_PATH

ARG NEXT_PUBLIC_APP_NAME="KSS_Client_Web"
ENV NEXT_PUBLIC_APP_NAME=$NEXT_PUBLIC_APP_NAME

# Cloudflare Turnstile (required for signup/reset-password CAPTCHA in production)
ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY=""
ENV NEXT_PUBLIC_TURNSTILE_SITE_KEY=$NEXT_PUBLIC_TURNSTILE_SITE_KEY

RUN npx prisma generate

RUN npm run build

FROM base AS runner
WORKDIR /app

# Install curl for healthcheck
RUN apk add --no-cache curl

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

COPY --from=builder /app/prisma ./prisma
RUN chown -R nextjs:nodejs /app/prisma && chmod -R 755 /app/prisma

COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
RUN chown -R nextjs:nodejs /app/node_modules/.prisma

# Copy i18n files if they're needed at runtime
COPY --from=builder --chown=nextjs:nodejs /app/i18n ./i18n

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV=production

# Runtime env: set via orchestrator (e.g. K8s). Required for signup/login: AUTH_API_BASE_URL, PERSON_API_BASE_URL.
# NEXT_PUBLIC_* are embedded at build time; server-side vars (DATABASE_URL, NEXTAUTH_*, AUTH_API_BASE_URL, etc.) come from deployment.
ENV NEXT_PUBLIC_APP_NAME=KSS_Client_Web
ENV NEXT_PUBLIC_BASE_PATH=""

CMD ["node", "server.js"]
