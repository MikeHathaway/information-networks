FROM node:alpine

MAINTAINER Mike Hathaway

RUN mkdir -p /usr/info-net-analysis/nlp-service
WORKDIR /usr/info-net-analysis/nlp-service

COPY . /usr/info-net-analysis/nlp-service

RUN npm install

EXPOSE 8080

CMD [ "npm", "start" ]
