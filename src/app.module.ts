import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Todo } from "./todo/entities/todo.entity";
import { TodoModule } from "./todo/todo.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mariadb",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "test",
      entities: [Todo],
      // TODO:
      // WARNING: change to false in production
      synchronize: true,
      retryAttempts: 3,
      retryDelay: 3000,
    }),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
