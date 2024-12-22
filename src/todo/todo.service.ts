import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { Todo } from "./entities/todo.entity";
import { DbService } from "src/db/db.service";

@Injectable()
export class TodoService {
  // prettier-ignore
  constructor(private readonly dbService: DbService) { }
  private todos: Todo[] = [];

  async findAllTodos() {
    const todos = await this.dbService.readDataFromDb();
    console.log("\n **TODOS** \n", todos);
    return todos;
  }

  async createNewTodo(createTodoDto: CreateTodoDto) {
    const newTodo: Todo = {
      ...createTodoDto,
      id: uuidv4(),
      created_at: new Date(),
      updated_at: new Date(),
    };
    await this.dbService.writeDataToDb(newTodo);
    return { newTodo };
  }

  async findOneTodo(id: string) {
    const todos = await this.dbService.readDataFromDb();
    const foundTodo = todos.find((todo) => todo.id === id);

    if (!foundTodo) {
      throw new Error(`todo with id: ${id} not found.`);
    }
    return foundTodo;
  }

  async updateTodo(id: string, updateTodoDto: UpdateTodoDto) {
    const todos = await this.dbService.readDataFromDb();
    const index = todos.findIndex((todo) => todo.id === id);

    if (index === -1) {
      throw new Error(`todo with id: ${id} not found.`);
    }

    todos[index] = {
      ...todos[index],
      ...updateTodoDto,
      updated_at: new Date(),
    };

    return todos[index];
  }

  async removeTodo(id: string) {
    const todos = await this.dbService.readDataFromDb();
    const index = todos.findIndex((todo) => todo.id === id);

    if (index === -1) {
      throw new Error(`todo with id: ${id} not found.`);
    }

    const removedTodo = todos.splice(index, 1);
    return removedTodo;
  }
}
