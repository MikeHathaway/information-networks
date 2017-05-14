FROM node:alpine

RUN mkdir -p /info-net-analysis/src/app
WORKDIR /usr/src/app

COPY package.json
RUN npm install

COPY server.js

EXPOSE 8080

CMD [ "npm", "start" ]
