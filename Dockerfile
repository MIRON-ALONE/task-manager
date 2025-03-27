FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install --production

COPY . .

RUN yarn run build

RUN npx prisma generate

EXPOSE 3000

CMD ["yarn", "run", "start:prod"]
