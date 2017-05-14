FROM node:alpine

MAINTAINER Mike Hathaway

ENV NODE_ENV=development

RUN mkdir -p /usr/info-net-analysis
WORKDIR /usr/info-net-analysis

COPY package.json /usr/info-net-analysis/package.json
RUN npm install

COPY server.js /usr/info-net-analysis/package.json
COPY api/ /usr/info-net-analysis/api/

EXPOSE 8080

CMD [ "npm", "start" ]
