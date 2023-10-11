FROM node:18-slim

WORKDIR /app
COPY . .
RUN npm ci
RUN npx tsc

# Run cron on container startup
CMD ["sh", "loop.sh"]
