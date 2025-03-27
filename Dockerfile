FROM node:18-alpine

RUN npm install -g yarn

WORKDIR /app

COPY package*.json ./

RUN yarn install --production

COPY . .

RUN npm run build

RUN npx prisma generate

EXPOSE 3000

CMD ["yarn", "run", "start:prod"]
