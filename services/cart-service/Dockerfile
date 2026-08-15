FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

RUN chown -R node:node /app

USER node

EXPOSE 3006

CMD ["npm", "start"]
