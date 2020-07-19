import { User } from 'src/entities/user.entity';
import { Builder } from 'builder-pattern';

/**
 * UserResponse is a mimic of User Entity to be passed as response.
 */
export class UserResponse {
  static fromUserEntity(user: User) {
    return Builder(UserResponse)
      .id(user.id)
      .firstName(user.firstName)
      .lastName(user.lastName)
      .email(user.email)
      .lastUpdatedBy(user.lastUpdatedBy)
      .createdAt(user.createdAt)
      .updatedAt(user.updatedAt)
      .deletedAt(user.deletedAt)
      .build();
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
