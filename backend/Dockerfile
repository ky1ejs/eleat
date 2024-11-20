# Copied from my other project, Cut: https://github.com/ky1ejs/cut

###########################################
# Build stage with dev deps for building the dist folder
###########################################
FROM node:22-alpine3.19 AS builder

RUN npm install -g pnpm
WORKDIR /app
COPY package*.json .
COPY prisma ./prisma
RUN pnpm install 
COPY . .
RUN pnpm codegen:graphql && pnpm run build

###########################################
# Deps stage with only production deps needed to rune the app to reduce image size
###########################################
FROM node:22-alpine3.19 as deps

ENV NODE_ENV production
WORKDIR /app
COPY package.json .
COPY pnpm-lock.yaml .
COPY prisma ./prisma
COPY graphql ./graphql
RUN npm install -g pnpm && pnpm install --prod

###########################################
# Final stage that assemble the image, including the dist folder and production deps
###########################################
FROM node:22-alpine3.19

ENV NODE_ENV production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=deps /app/package.json ./
COPY --from=deps /app/pnpm-lock.yaml ./
COPY --from=deps /app/prisma ./prisma
COPY --from=deps /app/graphql ./graphql
COPY --from=deps /app/node_modules ./node_modules
RUN npm install -g pnpm

ENV PORT 3000
EXPOSE 3000
LABEL fly_launch_runtime="nodejs"

CMD ["pnpm", "run", "migrate:start"]
