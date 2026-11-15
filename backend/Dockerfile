FROM node:22-alpine

WORKDIR /app

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy backend source code
COPY . .

EXPOSE 5000

CMD ["node", "server.js"]