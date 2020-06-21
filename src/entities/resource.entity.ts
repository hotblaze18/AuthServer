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
   * Represents the Resources that a user can view.
   */
  @Entity()
  export class Resource {
    constructor(
      name: string,
      service: string,
      endpoint: string,
      method: string,
      lastUpdatedBy: string,
    ) {
      this.name = name;
      this.service = service;
      this.endpoint = endpoint;
      this.method = method;
      this.lastUpdatedBy = lastUpdatedBy;
    }
  
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    @Index({ unique: true })
    name: string;

    @Column()
    @Index({ unique: true })
    service: string;
  
    @Column()
    @Index({ unique: true })
    endpoint: string;
    
    @Column()
    method: string;

    @Column()
    lastUpdatedBy: string;
  
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
  
    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt: Date;
  }
  