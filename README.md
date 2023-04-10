<h1 align="center">Dido - API</h1>

## :computer: Requirements

[![NodeJS](https://img.shields.io/badge/-Node.Js-%23339933?logo=nodedotjs&style=for-the-badge&logoColor=white)]((https://nodejs.org/en/))
[![Yarn](https://img.shields.io/badge/-Yarn-%232C8EBB?logo=yarn&style=for-the-badge&logoColor=white)](https://yarnpkg.com/)
[![NestJS](https://img.shields.io/badge/-nest%20js-%23E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Docker](https://img.shields.io/badge/-docker-%232496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

## Description

Dido - API.

## Installation

Navigate to the API's root directory and execute the following:

```bash
$ yarn
```

## Prepare the environment

**1**. Access the API's root directory and execute the following command:

``` sh
$ yarn run build:dev
```

**2**. At the API's root directory and execute the following command:

``` sh
$ yarn run seed
```
This command will create the standard roles and default user.

- **User:** admin@dido.com
- **Password:** P@ssw0rd

## Executing the API

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# homologation env with watch mode
$ yarn run start:homolog

# production mode
$ yarn run start:prod
```

## Documentation

After executing the described commands, access the following: http://localhost:`$PORT`/v`$VERSION`/docs

## Tests

```bash

# end to end tests
$ yarn run test:e2e

# end to end test watch
$ yarn run test:e2e:watch

# test coverage
$ yarn run test:e2e:cov

```

## ENV variables description

| Definition | Description |
| ---------- | ----------- |
| **PORT** | Port in wich the API will listen to http calls |
| **ENABLE_CORS** | Allow to obtain data from same origin requests |
| **ENABLE_DOCS** | Toggles the documentation page for the server |
| **APP_VERSION** | Version to be set when making API calls to endpoints and accessing the docs |
| **JWT_FRONTEND_ENCRYPTION_KEY** | Secret used for payload encription when communicating with front-end environtment |
| **JWT_EXPIRATION_TIME** | JWT expiration time in ms definition |
| **JWT_SECRET_KEY** | Secret to use for JWT signning |
| **NOSQL_CONNECTION_STRING** | Connection string for mongoDB connection |
| **NODE_ENV** | The environment configuration to bootstrap API internals |