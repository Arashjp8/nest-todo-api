import { IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class Todo {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDate()
  created_at: Date;

  @IsDate()
  updated_at: Date;
}
