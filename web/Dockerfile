# # Base
# FROM node:18 AS base
# CMD [ "bash" ]

# # Build
# FROM base AS test-and-build
# COPY . /workspace
# WORKDIR /workspace
# ARG NEXT_PUBLIC_API_SERVER
# ENV NEXT_PUBLIC_API_SERVER=$NEXT_PUBLIC_API_SERVER
# RUN npm ci
# RUN npm run test
# RUN npm run build

# # Production stage
# FROM node:18 AS production
# COPY --from=test-and-build /workspace ./
# CMD ["npm", "run", "start"]

# Base
FROM node:18 AS base
WORKDIR /workspace
COPY . .
ARG NEXT_PUBLIC_API_SERVER
ENV NEXT_PUBLIC_API_SERVER=$NEXT_PUBLIC_API_SERVER
RUN npm ci
RUN npm run test
RUN npm run build

# nginxをセットアップするためのステージ
FROM nginx:alpine AS nginx-setup
COPY nginx.conf /etc/nginx/nginx.conf

# Production stage
FROM nginx:alpine AS production
# Next.jsのビルド成果物をコピー
COPY --from=base /workspace/out /usr/share/nginx/html
# カスタムnginx設定をコピー
COPY --from=nginx-setup /etc/nginx/nginx.conf /etc/nginx/nginx.conf

# nginxを起動
CMD ["nginx", "-g", "daemon off;"]