import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {IsEmail} from "class-validator";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}