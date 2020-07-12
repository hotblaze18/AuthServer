import { User } from 'src/entities/user.entity';

/**
 * UserResponse is a mimic of User Entity to be passed as response.
 */
export class UserResponse {
  constructor(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    lastUpdatedBy: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.lastUpdatedBy = lastUpdatedBy;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  static fromUserEntity(user: User) {
    return new UserResponse(
      user.id,
      user.firstName,
      user.lastName,
      user.email,
      user.lastUpdatedBy,
      user.createdAt,
      user.updatedAt,
      user.deletedAt,
    );
  }

  static fromUserEntityList(userList: User[]) {
    const userDtoList: UserResponse[] = [];
    userList.forEach(user => {
      userDtoList.push(UserResponse.fromUserEntity(user));
    });
    return userDtoList;
  }

  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  lastUpdatedBy: string;
}
