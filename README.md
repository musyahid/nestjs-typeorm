## Installation

```bash
   $ npm install
```

## Config settings ormconfig.json for connect MySQL

```
{
   "type": "mysql",
   "host": "localhost",
   "port": 3306,
   "username": "my_username",
   "password": "my_password",
   "database": "my_database",
   "synchronize": true,
   "logging": false,
   "entities": [
      "dist/**/*.entity.js"
   ],
   "migrations": [
      "dist/migration/**/*.js"
   ],
   "subscribers": [
      "dist/subscriber/**/*.js"
   ],
   "cli": {
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}
```

## Install TypeScript Node

```bash
   $ npm install -g ts-node
```

## Running migrations with typeorm

```bash
   $ ts-node node_modules/.bin/typeorm migration:run
```

or

```bash
   $ node_modules/.bin/typeorm migration:run
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

## Docker

There is a `docker-compose.yml` file for starting MySQL with Docker.

`$ docker-compose up`

After running, you can stop the Docker container with

`$ docker-compose down`


