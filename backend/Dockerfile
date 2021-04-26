FROM node:15.5.0-slim

WORKDIR /app

COPY package.json /app
COPY ./yarn.lock ./

RUN yarn install

COPY . /app 

EXPOSE 8080

CMD ["yarn", "start"]