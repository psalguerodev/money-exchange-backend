<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

Money Exchange API

## Kanban

For view the activities go to [Trello Kanban](https://trello.com/b/e37QSC8C/belatrix-money-exchange)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Swagger

Only configured for development environment [Swagger Open Api 2](http://localhost:3000/api/#/exchange/get_exchange)

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Scalffolding

```
.
├── auth
│   ├── dto
│   │   └── auth-credentials.dto.ts
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── get-user.decorator.ts
│   ├── jwt-payload.interface.ts
│   ├── jwt-strategy.ts
│   ├── jwt.strategy.spec.ts
│   ├── user.entity.spec.ts
│   ├── user.entity.ts
│   ├── user.repository.spec.ts
│   └── user.respository.ts
├── config
│   ├── environments.config.ts
│   ├── swagger.config.ts
│   └── typeorm.config.ts
├── exchange
│   ├── dto
│   │   └── get-money-exchange.dto.ts
│   ├── exchange.controller.spec.ts
│   ├── exchange.controller.ts
│   ├── exchange.entity.ts
│   ├── exchange.module.ts
│   ├── exchange.repository.ts
│   ├── exchange.service.spec.ts
│   └── exchange.service.ts
├── app.module.ts
└── main.ts
```