FROM node:alpine

MAINTAINER Mike Hathaway

RUN mkdir -p /usr/info-net-analysis/app
WORKDIR /usr/info-net-analysis/app

COPY . /usr/info-net-analysis/app

RUN npm install

EXPOSE 8080

CMD [ "npm", "start" ]
