module.exports = [
  {
    name: 'default',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'mysecretpassword', //mysecretpassword
    database: 'authserver',
    entities: ['dist/**/*.entity.js'],
    synchronize: true,
    migrations: ['dist/migrations/**/*.js'],
    cli: {
      migrationsDir: 'src/migrations',
    },
  },
  {
    name: 'unittest',
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: 'mysecretpassword',
    database: 'authserver',
    entities: ['dist/**/*.entity.js'],
    synchronize: true,
    migrations: ['dist/migrations/**/*.js'],
    cli: {
      migrationsDir: 'src/migrations',
    },
  },
];
