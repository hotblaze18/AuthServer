import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import {
  Connection,
  Repository,
  createConnection,
  getConnection,
  Entity,
  getRepository,
  QueryRunner,
  EntitySchema,
  EntityRepository,
} from 'typeorm';
import { User } from '../../entities/user.entity';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import {
  setupConnection,
  teardownConnection,
} from '../../common/unitTest/databaseConnection';

describe('UserService', () => {
  let service: UserService;
  let transactionRunner: QueryRunner;

  beforeAll(async () => {
    transactionRunner = await setupConnection([User]);

    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: getRepository(User, 'default'),
        },
      ],
    }).compile();
    service = moduleRef.get<UserService>(UserService);
  });

  afterAll(async () => {
    teardownConnection(transactionRunner);
  });

  it('service_isDefined', async () => {
    expect(service).toBeDefined();
  });

  it('getUserById_success', async () => {
    let expectedUser: User = new User(
      'user1',
      'last1',
      'user1@x.com',
      'password',
      'user1',
    );
    await transactionRunner.manager.insert(User, expectedUser);

    const resultedUser = await service.getUserById(
      transactionRunner,
      expectedUser.id,
    );

    expect(resultedUser).toEqual(expectedUser);
  });
});
