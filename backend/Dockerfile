FROM oven/bun:canary-debian
WORKDIR /http-test-app
COPY . .
RUN bun install
EXPOSE 8080
CMD ["bun","run","index.ts"]
