import { Test } from '@nestjs/testing';
import { UserService } from '../../modules/user/user.service';
import { getRepository, QueryRunner } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserRequest } from '../../modules/user/dto/request/createUser.dto';
import { Builder } from 'builder-pattern';
import {
  setupConnection,
  teardownConnection,
} from 'src/common/unitTest/databaseConnection';
import { User } from 'src/entities/user.entity';
import { BadRequestException } from '@nestjs/common';
import { UpdateUserRequest } from '../../modules/user/dto/request/updateUser.dto';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { v4 as uuidv4 } from 'uuid';

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
    const expectedUser: User = Builder(User)
      .email('user1@x.com')
      .firstName('user1')
      .lastName('last1')
      .password('password')
      .lastUpdatedBy('user1')
      .build();

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
      .id(expect.any(String))
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

    expect(resultedUser).toEqual(expectedUser);
  });

  it('createUser_userAlreadyExists_throwBadRequestException', async () => {
    const userToUpdate: User = Builder(User)
      .email('user1@x.com')
      .firstName('user1')
      .lastName('last1')
      .password('password')
      .lastUpdatedBy('user1')
      .build();
    await transactionRunner.manager.insert(User, userToUpdate);
    const createUserRequest: CreateUserRequest = Builder(CreateUserRequest)
      .email('user1@x.com')
      .firstName('user1')
      .lastName('last1')
      .password('password')
      .confirmPassword('password')
      .build();

    const functionUnderTest = () =>
      service.createUser(transactionRunner, createUserRequest);

    await expect(functionUnderTest).rejects.toThrow(BadRequestException);
    await expect(functionUnderTest).rejects.toThrowError('User already exist');
  });

  it('updateUser_returnUpdatedUser', async () => {
    const userToUpdate: User = Builder(User)
      .email('user1@x.com')
      .firstName('user1')
      .lastName('last1')
      .password('password')
      .lastUpdatedBy('user1')
      .build();
    await transactionRunner.manager.insert(User, userToUpdate);
    const updateUserRequest: UpdateUserRequest = Builder(UpdateUserRequest)
      .email('newemail@x.com')
      .lastName('l1')
      .build();
    const expectedUser: User = Builder(userToUpdate)
      .email('newemail@x.com')
      .lastName('l1')
      .build();

    const resultedUser = await service.updateUser(
      transactionRunner,
      userToUpdate.id,
      updateUserRequest,
    );

    await expect(resultedUser).toEqual(expectedUser);
  });

  it('updateUser_UserNotExist_throwEntityNotFoundError', async () => {
    const updateUserRequest: UpdateUserRequest = Builder(UpdateUserRequest)
      .email('newemail@x.com')
      .lastName('l1')
      .build();

    const uuid = uuidv4();
    const functionUnderTest = () =>
      service.updateUser(transactionRunner, uuid, updateUserRequest);

    await expect(functionUnderTest).rejects.toThrow(EntityNotFoundError);
    await expect(functionUnderTest).rejects.toThrowError(
      new EntityNotFoundError(User, uuid).message,
    );
  });

  it('deleteUser_returnUserId', async () => {
    const userToDelete: User = Builder(User)
      .email('user1@x.com')
      .firstName('user1')
      .lastName('last1')
      .password('password')
      .lastUpdatedBy('user1')
      .build();
    await transactionRunner.manager.insert(User, userToDelete);

    const resultedUser = await service.deleteUser(
      transactionRunner,
      userToDelete.id,
    );

    const queryedUser = await transactionRunner.manager.findOne(
      User,
      userToDelete.id,
    );

    await expect(resultedUser).toEqual(userToDelete.id);
    await expect(queryedUser).toEqual(undefined);
  });

  it('deleteUser_UserNotExist_throwEntityNotFoundError', async () => {
    const uuid = uuidv4();
    const functionUnderTest = () => service.deleteUser(transactionRunner, uuid);

    await expect(functionUnderTest).rejects.toThrow(EntityNotFoundError);
    await expect(functionUnderTest).rejects.toThrowError(
      new EntityNotFoundError(User, uuid).message,
    );
  });

  it('deleteUser_AlreadyDeletedUser_throwEntityNotFoundError', async () => {
    const userToDelete: User = Builder(User)
      .email('user1@x.com')
      .firstName('user1')
      .lastName('last1')
      .password('password')
      .lastUpdatedBy('user1')
      .build();
    await transactionRunner.manager.insert(User, userToDelete);
    await transactionRunner.manager.softDelete(User, userToDelete.id);

    const functionUnderTest = () =>
      service.deleteUser(transactionRunner, userToDelete.id);

    await expect(functionUnderTest).rejects.toThrow(EntityNotFoundError);
    await expect(functionUnderTest).rejects.toThrowError(
      new EntityNotFoundError(User, userToDelete.id).message,
    );
  });

  it('queryUser_returnAllUsers', async () => {
    const user1: User = Builder(User)
      .email('user1@x.com')
      .firstName('user1')
      .lastName('last1')
      .password('password')
      .lastUpdatedBy('user1')
      .build();
    const user2: User = Builder(User)
      .email('user2@x.com')
      .firstName('user2')
      .lastName('last2')
      .password('password')
      .lastUpdatedBy('user2')
      .build();
    await transactionRunner.manager.insert(User, [user1, user2]);

    const resultedUsers = await service.queryUser(transactionRunner);

    await expect(resultedUsers).toEqual([user1, user2]);
  });

  it('queryUser_withDeletedUser_returnWithoutDeletedUser', async () => {
    const user1: User = Builder(User)
      .email('user1@x.com')
      .firstName('user1')
      .lastName('last1')
      .password('password')
      .lastUpdatedBy('user1')
      .build();
    const user2: User = Builder(User)
      .email('user2@x.com')
      .firstName('user2')
      .lastName('last2')
      .password('password')
      .lastUpdatedBy('user2')
      .build();
    await transactionRunner.manager.insert(User, [user1, user2]);
    await transactionRunner.manager.softDelete(User, user2.id);

    const resultedUsers = await service.queryUser(transactionRunner);

    await expect(resultedUsers).toEqual([user1]);
  });
});
