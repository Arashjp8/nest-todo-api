import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TodoModule } from "./todo/todo.module";
import { DbService } from "./db/db.service";

@Module({
  imports: [TodoModule],
  controllers: [AppController],
  providers: [AppService, DbService],
})
export class AppModule {}
