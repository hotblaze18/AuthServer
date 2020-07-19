import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserRequest } from './dto/request/createUser.dto';
import { User } from '../../entities/user.entity';
import { QueryRunner } from 'typeorm';
import { hash } from 'bcrypt';
import { UpdateUserRequest } from './dto/request/updateUser.dto';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { Builder } from 'builder-pattern';

/**
 * // TODO(m-nikhil): update lastUpdatedBy to actual user, after login is done.
 * UserService has the CRUD operation for the user entity.
 */

@Injectable()
export class UserService {
  /**
   * create new user if password and confirm password match
   */
  async createUser(
    transactionRunner: QueryRunner,
    createUserRequest: CreateUserRequest,
  ): Promise<User> {
    const user = Builder(User)
      .email(createUserRequest.email)
      .firstName(createUserRequest.firstName)
      .lastName(createUserRequest.lastName)
      .password(await hash(createUserRequest.password, 10))
      .lastUpdatedBy('curr_user')
      .build();

    return transactionRunner.manager.save(user).catch(() => {
      throw new BadRequestException('User already exist');
    });
  }

  /**
   * get user by id or throw EntityNotFoundError
   */
  async getUserById(transactionRunner: QueryRunner, id: string): Promise<User> {
    return transactionRunner.manager.findOneOrFail(User, id);
  }

  /**
   * get user by email or throw EntityNotFoundError
   */
  async getUserByEmail(
    transactionRunner: QueryRunner,
    email: string,
  ): Promise<User> {
    return transactionRunner.manager.findOneOrFail(User, email);
  }

  /**
   * update user by id and if deletedAt is null (to ensure user is not soft deleted),
   * else throw `EntityNotFoundError`.
   *
   * Update lastUpdatedBy column.
   */
  async updateUser(
    transactionRunner: QueryRunner,
    id: string,
    updateUserRequest: UpdateUserRequest,
  ): Promise<User> {
    const updateResult = await transactionRunner.manager
      .createQueryBuilder()
      .update(User)
      .set(updateUserRequest)
      .where('id = :id', { id: id })
      .andWhere('deletedAt is null')
      .execute();

    const success: boolean = updateResult.affected > 0;
    if (!success) {
      throw new EntityNotFoundError(User, id);
    }

    return transactionRunner.manager.findOneOrFail(User, id);
  }

  /**
   * delete user by id and if deletedAt is null (to ensure user is not soft deleted),
   * else throw `EntityNotFoundError`.
   *
   * Update lastUpdatedBy column
   */
  async deleteUser(
    transactionRunner: QueryRunner,
    id: string,
  ): Promise<string> {
    const updateResult = await transactionRunner.manager
      .createQueryBuilder()
      .update(User)
      .set({
        lastUpdatedBy: 'curr_user',
      })
      .where('id = :id', { id: id })
      .andWhere('deletedAt is null')
      .execute();

    const success: boolean = updateResult.affected > 0;
    if (!success) {
      throw new EntityNotFoundError(User, id);
    }

    transactionRunner.manager.softDelete(User, id);
    return id;
  }

  /**
   * query user table
   */
  async queryUser(transactionRunner: QueryRunner): Promise<User[]> {
    return transactionRunner.manager.find(User);
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return user.validatePassowrd(password);
  }
}
