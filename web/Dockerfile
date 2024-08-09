# Base
FROM node:18 AS base
CMD [ "bash" ]

# Build
FROM base AS test-and-build
COPY . /workspace
WORKDIR /workspace
ARG NEXT_PUBLIC_API_SERVER
ENV NEXT_PUBLIC_API_SERVER=$NEXT_PUBLIC_API_SERVER
# ENV NEXT_PUBLIC_API_SERVER=https://sekigae-machine.jp/api
ENV NEXT_PUBLIC_USERDATA_SERVER=https://sekigae-machine.jp
RUN npm ci
RUN npm run test
RUN npm run build

# Production stage
FROM node:18 AS production
COPY --from=test-and-build /workspace ./
ENV AUTH_SECRET=d4275e7218599e57442110dff3487436e3d516ce4f1984ea71aa86d5b4be34f3
ENV AUTH_URL=https://sekigae-machine.jp/api/auth
ENV AUTH_GITHUB_ID=Ov23lilX4ss6hQrBI5vy
ENV AUTH_GITHUB_SECRET=966699b1014e5c46b118cc951de3fcf2308c5145
ENV AUTH_GOOGLE_ID=769013728633-s6sani2cbd7au3nd1nnb9km4ai4gk6ul.apps.googleusercontent.com
ENV AUTH_GOOGLE_SECRET=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
CMD ["npm", "run", "start"]
