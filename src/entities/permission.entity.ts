import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Index,
  } from 'typeorm';
  
  /**
   * Represents the Permission that a user can have.
   */
  @Entity()
  export class Permission {
    constructor(
      name: string,
      description: string,
      lastUpdatedBy: string,
    ) {
      this.name = name;
      this.description = description;
      this.lastUpdatedBy = lastUpdatedBy;
    }
  
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    @Index({ unique: true })
    name: string;

    @Column()
    description: string;
  
    @Column()
    lastUpdatedBy: string;
  
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
  
    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt: Date;
  }
  