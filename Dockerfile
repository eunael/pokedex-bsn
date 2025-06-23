FROM node:24.2-alpine

WORKDIR /app

COPY . .

RUN npm install && \
    npm install -g @ionic/cli

RUN addgroup -g 1001 -S nodejs && \
    adduser -S ionic -u 1001 -G nodejs && \
    chown -R ionic:nodejs /app

USER ionic

EXPOSE 8100

CMD ["ionic", "serve", "--host", "0.0.0.0", "--port", "8100", "--no-open"]
