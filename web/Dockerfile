# Base
FROM node:18 AS base
CMD [ "bash" ]

# Build
FROM base AS test-and-build
COPY . /workspace
WORKDIR /workspace
ARG NEXT_PUBLIC_API_SERVER
ENV NEXT_PUBLIC_API_SERVER=$NEXT_PUBLIC_API_SERVER
ENV AUTH_SECRET=d4275e7218599e57442110dff3487436e3d516ce4f1984ea71aa86d5b4be34f3
ENV AUTH_URL=http://my-app-sacicd-alb-210697540.ap-northeast-1.elb.amazonaws.com/api/auth
ENV AUTH_GITHUB_ID=Ov23li2yokyvI80xNLKy
ENV AUTH_GITHUB_SECRET=0de06e7ef9dd8985f8f4213b0dd312409e1b942a
ENV AUTH_GOOGLE_ID=769013728633-s6sani2cbd7au3nd1nnb9km4ai4gk6ul.apps.googleusercontent.com
ENV AUTH_GOOGLE_SECRET=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
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