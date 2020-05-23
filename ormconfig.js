module.exports = {
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "mysecretpassword",
    "database": "authserver",
    "entities": ["dist/**/*.entity.js", "src/entities/*.entity.ts"],
    "synchronize": true,
    "migrations": [
        "src/migrations/**/*.ts"
      ],
      "cli": {
        "migrationsDir": "src/migrations"
      }
  }