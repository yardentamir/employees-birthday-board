FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000
EXPOSE 27017

CMD ["yarn", "start"]