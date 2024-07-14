# Base
FROM node:18 AS base
CMD [ "bash" ]

# Build
FROM base AS test-and-build
COPY . /workspace
WORKDIR /workspace
# ARG NEXT_PUBLIC_API_SERVER
#ENVの方が強い
ENV NEXT_PUBLIC_API_SERVER=$NEXT_PUBLIC_API_SERVER
RUN npm ci
RUN npm run test
RUN npm run build

# Production stage
FROM node:18 AS production
COPY --from=test-and-build /workspace ./
CMD ["npm", "run", "start"]

# # Base
# FROM node:18 AS base
# WORKDIR /workspace
# COPY package*.json ./
# RUN npm ci

# # Build
# FROM base AS builder
# COPY . .
# RUN npm run build
# RUN npm run test

# # Production stage
# FROM node:18 AS production
# WORKDIR /app
# COPY --from=builder /workspace/.next ./.next
# COPY --from=builder /workspace/public ./public
# COPY --from=builder /workspace/package.json ./package.json
# RUN npm install next

# CMD ["npm", "run", "start"]