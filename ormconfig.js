module.exports = {
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "mysecretpassword",
    "database": "authserver",
    "entities": ["dist/**/*.entity.js"],
    "synchronize": true,
    "migrations": [
        "dist/migrations/**/*.js"
      ],
      "cli": {
        "migrationsDir": "src/migrations"
      }
  }