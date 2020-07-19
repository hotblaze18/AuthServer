import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
} from 'typeorm';

import { compare } from 'bcrypt';

/**
 * Represents the users who access the application
 */
@Entity()
export class User {
  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    lastUpdatedBy: string,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.lastUpdatedBy = lastUpdatedBy;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  lastUpdatedBy: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  async validatePassowrd(plaintextPassword) {
    return await compare(plaintextPassword, this.password);
  }
}
