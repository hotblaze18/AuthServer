import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateUserRequest } from './dto/request/createUser.dto';
import { UserService } from './user.service';
import { UserResponse } from './dto/response/user.dto';
import { UpdateUserRequest } from './dto/request/updateUser.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ErrorResponse } from 'src/common/dto/error.dto';
import { Connection } from 'typeorm';
import { atomic } from 'src/common/database/transaction';

@Controller('user')
@ApiTags('user')
@ApiResponse({
  status: 404,
  type: ErrorResponse,
  description: 'Entity not found.',
})
export class UserController {
  constructor(private readonly userService: UserService,
    private connection: Connection) {}

  /**
   * create a new user
   */

  @Post()
  async create(
    @Body() createUserRequest: CreateUserRequest
  ): Promise<UserResponse> {
    const userDto = UserResponse.fromUserEntity(
      await atomic(this.connection,this.userService.createUser,createUserRequest)
    );
    return userDto;
  }

  /**
   * query all user
   * TODO: add filter to get softdeleted rows
   * TODO: add filter for pagination
   */
  @Get()
  async query(): Promise<UserResponse[]> {
    const userResponseList = UserResponse.fromUserEntityList(
      await atomic(this.connection,this.userService.queryUser)
    );
    return userResponseList;
  }

  /**
   * get a user by id
   */
  @Get(':id')
  async find(@Param('id') id: number): Promise<UserResponse> {
    const userDto = UserResponse.fromUserEntity(
      await atomic(this.connection,this.userService.getUserById,id)
    );
    return userDto;
  }

  /**
   * update a user by id
   */
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserRequest: UpdateUserRequest,
  ): Promise<UserResponse> {
    const userDto = UserResponse.fromUserEntity(
      await atomic(this.connection,this.userService.updateUser,id, updateUserRequest)
    );
    return userDto;
  }

  /**
   * delete a user by id
   */
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return atomic(this.connection,this.userService.deleteUser,id)
  }
}
