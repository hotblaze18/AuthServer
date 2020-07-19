import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

/**
 * Represents the Roles that a user can have.
 */
@Entity()
export class UserRoleAssociation {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  roleId: string;

  @Column()
  lastUpdatedBy: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
