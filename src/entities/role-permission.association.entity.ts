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
      roleId: string,
      permissionId: string,
      lastUpdatedBy: string,
    ) {
      this.roleId = roleId;
      this.permissionId = permissionId;
      this.lastUpdatedBy = lastUpdatedBy;
    }
  
    @Column()
    roleId: string;

    @Column()
    permissionId: string;
  
    @Column()
    lastUpdatedBy: string;
  
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
  
    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt: Date;
  }
  