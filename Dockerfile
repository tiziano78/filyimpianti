FROM node:18-alpine AS deps

WORKDIR /app

# Installa le dipendenze necessarie per sharp e altri pacchetti
RUN apk add --no-cache python3 make g++ libc6-compat curl

# Copia i file di configurazione
COPY package.json package-lock.json ./
COPY next.config.js .
COPY tsconfig.json .
COPY .env .
COPY public ./public

# Installa TUTTE le dipendenze
RUN npm install --production=false

# Builder stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Costruisci l'applicazione
ENV NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoiZmlseWltcGlhbnRpIiwiYSI6ImNtNHdueWFwNDA2dnYya3IwamxibGJwdTEifQ.9j-puKYjscfE8iFY5RvkhA
ENV NODE_ENV=production
RUN npm run build

# Production stage
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoiZmlseWltcGlhbnRpIiwiYSI6ImNtNHdueWFwNDA2dnYya3IwamxibGJwdTEifQ.9j-puKYjscfE8iFY5RvkhA

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copia package.json e installa tutte le dipendenze
COPY package.json package-lock.json ./
RUN npm install --production=false

# Copia i file necessari
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./next.config.js

# Crea directory cache e imposta permessi
RUN mkdir -p .next/cache/images && \
    chown -R nextjs:nodejs /app/.next && \
    chmod -R 755 /app/.next

USER nextjs

EXPOSE 3000 9229

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["npm", "start"] 