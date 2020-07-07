import {
  createConnection,
  getConnection,
  QueryRunner,
  Connection,
} from 'typeorm';
import { async } from 'rxjs/internal/scheduler/async';

export async function setupConnection(entities) {
  await createConnection({
    type: 'postgres',
    synchronize: true,
    logging: false,
    url: 'postgres://postgres:mysecretpassword@localhost:5433/authserver',
    entities: entities,
  });

  const connection: Connection = getConnection();
  const queryRunner: QueryRunner = connection.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  return queryRunner;
}

export async function teardownConnection(queryRunner: QueryRunner) {
  await queryRunner.rollbackTransaction();
  let connection: Connection = getConnection();
  return connection.close();
}
