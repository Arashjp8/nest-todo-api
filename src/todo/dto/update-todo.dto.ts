import { PartialType } from "@nestjs/mapped-types";
import { CreateTodoDto } from "./create-todo.dto";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDate()
  updated_at: Date;
}
