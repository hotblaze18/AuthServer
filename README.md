## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Migrations

```bash
# autogenerate migrations
$ yarn typeorm migration:generate -n {migration name}

# runs all pending migrations.
$ yarn typeorm migration:run
```

## Linting & Formatting

```bash
# lint
$ yarn lint

# format
$ yarn format
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```