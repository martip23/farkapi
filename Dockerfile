FROM node:alpine AS base
ENV NODE_ENV=production
WORKDIR /app

FROM node as build
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . ./
RUN npm run build

FROM base
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY --from=build /app/dist /app/dist

ENTRYPOINT ["node", "--experimental-specifier-resolution=node", "."]
