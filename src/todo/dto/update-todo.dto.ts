import { PartialType } from "@nestjs/mapped-types";
import { CreateTodoDto } from "./create-todo.dto";
import { IsDate } from "class-validator";

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsDate()
  updated_at: Date;
}
