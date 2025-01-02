import { IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("todo")
export class Todo {
  @PrimaryGeneratedColumn("uuid")
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  description: string;

  @CreateDateColumn()
  @IsDate()
  created_at: Date;

  @UpdateDateColumn()
  @IsDate()
  updated_at: Date;
}
