import { Module } from "@nestjs/common";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";
import { DbService } from "src/db/db.service";

@Module({
  controllers: [TodoController],
  providers: [TodoService, DbService],
})
export class TodoModule {}
