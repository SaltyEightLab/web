# Base
FROM node:18 AS base
CMD [ "bash" ]

# Build
FROM base AS test-and-build
COPY . /workspace
WORKDIR /workspace
RUN npm ci
RUN npm run test
RUN npm run build

# Production stage
FROM node:18 AS production
COPY --from=test-and-build /workspace ./
CMD ["npm", "run", "start"]


# # Hosting in nginx
# FROM nginx:latest AS production
# COPY --from=build /workspace/build /var/www
# COPY nginx.conf /etc/nginx/conf.d/default.conf
