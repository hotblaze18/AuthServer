import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Index,
  } from 'typeorm';
  
  /**
   * Represents the Roles that a user can have.
   */
  @Entity()
  export class UserRoleAssociation {
    constructor(
      userId: string,
      roleId: string,
      lastUpdatedBy: string,
    ) {
      this.userId = userId;
      this.roleId = roleId;
      this.lastUpdatedBy = lastUpdatedBy;
    }
  
    @Column()
    userId: string;

    @Column()
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
  