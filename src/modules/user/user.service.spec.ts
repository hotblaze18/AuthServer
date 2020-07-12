import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepository, QueryRunner } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserRequest } from './dto/request/createUser.dto';
import { Builder } from 'builder-pattern';
import {
  setupConnection,
  teardownConnection,
} from 'src/common/unitTest/databaseConnection';
import { User } from 'src/entities/user.entity';

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
    await teardownConnection(transactionRunner);
  });

  beforeEach(async () => {
    await transactionRunner.startTransaction();
  });

  afterEach(async () => {
    await transactionRunner.rollbackTransaction();
  });

  it('service_isDefined', async () => {
    expect(service).toBeDefined();
  });

  it('getUserById_returnUserWithRequestedId', async () => {
    const expectedUser: User = new User(
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

  it('createUser_returnCreatedUser', async () => {
    const expectedUser: User = Builder(User)
      .email('user1@x.com')
      .id(expect.any(Number))
      .firstName('user1')
      .lastName('last1')
      .password(expect.any(String))
      .createdAt(expect.any(Date))
      .updatedAt(expect.any(Date))
      .lastUpdatedBy('curr_user')
      .deletedAt(null)
      .build();
    const createUserRequest: CreateUserRequest = Builder(CreateUserRequest)
      .email('user1@x.com')
      .firstName('user1')
      .lastName('last1')
      .password('password')
      .confirmPassword('password')
      .build();

    const resultedUser = await service.createUser(
      transactionRunner,
      createUserRequest,
    );
    await transactionRunner.manager.findOne(User, resultedUser.id);

    expect(resultedUser).toEqual(expectedUser);
  });
});
