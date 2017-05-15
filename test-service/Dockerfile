FROM node:alpine

MAINTAINER Mike Hathaway

RUN mkdir -p /usr/info-net-analysis/test-service
WORKDIR /usr/info-net-analysis/test-service

COPY . /usr/info-net-analysis/test-service

RUN npm install

EXPOSE 8080

CMD [ "npm", "test" ]
