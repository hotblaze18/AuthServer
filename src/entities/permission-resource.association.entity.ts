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
      permissionId: string,
      resourceId: string,
      lastUpdatedBy: string,
    ) {
      this.permissionId = permissionId;
      this.resourceId = resourceId;
      this.lastUpdatedBy = lastUpdatedBy;
    }
  
    @Column()
    permissionId: string;

    @Column()
    resourceId: string;
  
    @Column()
    lastUpdatedBy: string;
  
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
  
    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt: Date;
  }
  