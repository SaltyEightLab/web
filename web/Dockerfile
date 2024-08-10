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
# ENV AUTH_SECRET=d4275e7218599e57442110dff3487436e3d516ce4f1984ea71aa86d5b4be34f3
# ENV AUTH_GOOGLE_ID=769013728633-s6sani2cbd7au3nd1nnb9km4ai4gk6ul.apps.googleusercontent.com
# ENV AUTH_GOOGLE_SECRET=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
CMD ["npm", "run", "start"]
