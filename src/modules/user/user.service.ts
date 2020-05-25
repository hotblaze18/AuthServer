import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserRequest } from './dto/request/createUser.dto';
import { User } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { UpdateUserRequest } from './dto/request/updateUser.dto';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import e = require('express');

/**
 * // TODO(m-nikhil): update lastUpdatedBy to actual user, after login is done.
 * UserService has the CRUD operation for the user entity.
 */

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  /**
   * create new user if password and confirm password match
   */
  async createUser(createUserRequest: CreateUserRequest): Promise<User> {
    const user = new User(
      createUserRequest.firstName,
      createUserRequest.lastName,
      createUserRequest.email,
      await hash(createUserRequest.password, 10),
      'curr_user',
    );
    return this.userRepository.save(user).catch(e => {
      throw new BadRequestException('User already exist');
    });
  }

  /**
   * get user by id or throw EntityNotFoundError
   */
  async getUserById(id: number): Promise<User> {
    return this.userRepository.findOneOrFail(id);
  }

  /**
   * update user by id and if deletedAt is null (to ensure user is not soft deleted),
   * else throw `EntityNotFoundError`.
   *
   * Update lastUpdatedBy column.
   */
  async updateUser(
    id: number,
    updateUserRequest: UpdateUserRequest,
  ): Promise<User> {
    const updateResult = await this.userRepository
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

    return this.userRepository.findOneOrFail(id);
  }

  /**
   * delete user by id and if deletedAt is null (to ensure user is not soft deleted),
   * else throw `EntityNotFoundError`.
   *
   * Update lastUpdatedBy column
   */
  async deleteUser(id: number): Promise<number> {
    const updateResult = await this.userRepository
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

    this.userRepository.softDelete(id);
    return id;
  }

  /**
   * query user table
   */
  async queryUser(): Promise<User[]> {
    return this.userRepository.find();
  }
}
