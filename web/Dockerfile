# Base
FROM node:18 AS base
CMD [ "bash" ]

# Build
FROM base AS test-and-build
COPY . /workspace
WORKDIR /workspace
ENV NEXT_PUBLIC_API_SERVER=https://sekigae-machine.jp/api
ENV NEXT_PUBLIC_USERDATA_SERVER=https://sekigae-machine.jp
RUN npm ci
RUN npm run test
RUN npm run build

# Production stage
FROM node:18 AS production
COPY --from=test-and-build /workspace ./

ARG AUTH_SECRET
ARG AUTH_GOOGLE_ID
ARG AUTH_GOOGLE_SECRET
ENV AUTH_SECRET=$AUTH_SECRET
ENV AUTH_URL=https://sekigae-machine.jp/api/auth
ENV AUTH_GOOGLE_ID=$AUTH_GOOGLE_ID
ENV AUTH_GOOGLE_SECRET=$AUTH_GOOGLE_SECRET

CMD ["npm", "run", "start"]
