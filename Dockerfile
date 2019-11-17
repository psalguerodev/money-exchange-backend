FROM node:10

LABEL author="Patrick Salguero Avalos"

WORKDIR /money-exchange-api

COPY ./package.json .

COPY ./yarn.lock .

RUN yarn install

COPY dist .

EXPOSE 3000 3001 3002

CMD yarn start
