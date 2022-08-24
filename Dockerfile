FROM node:16-slim AS development

WORKDIR /backend

COPY package*.json .

RUN npm ci

COPY . .

FROM node:16-slim AS production

WORKDIR /backend

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build

RUN npm run start:prod
