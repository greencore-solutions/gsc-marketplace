FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY server.js canon.js kit.js kg.js apex.js x402.js ./
ENV PORT=8080
EXPOSE 8080
CMD ["node", "server.js"]
