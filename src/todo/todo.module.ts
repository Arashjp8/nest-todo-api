import { Module } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { TodoController } from "./todo.controller";
import { CsvService } from "./csv/csv.service";

@Module({
  controllers: [TodoController],
  providers: [TodoService, CsvService],
})
export class TodoModule {}
