import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { DbService } from "src/db/db.service";
import { v4 as uuidv4 } from "uuid";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { Todo } from "./entities/todo.entity";

@Injectable()
export class TodoService {
  // prettier-ignore
  constructor(private readonly dbService: DbService) { }

  async findAllTodos() {
    const todos = await this.dbService.readDataFromDb();
    return todos;
  }

  async createNewTodo(createTodoDto: CreateTodoDto) {
    if (Object.keys(createTodoDto).length === 0) {
      throw new BadRequestException("Request body cannot be empty");
    }

    const todos = await this.dbService.readDataFromDb();
    const newTodo: Todo = {
      ...createTodoDto,
      id: uuidv4(),
      created_at: new Date(),
      updated_at: new Date(),
    };

    todos.push(newTodo);
    await this.dbService.writeDataToDb(todos);

    return {
      message: `Todo has been successfully created.`,
      newTodo,
    };
  }

  async findOneTodo(id: string) {
    const todos = await this.dbService.readDataFromDb();
    const foundTodo = todos.find((todo) => todo.id === id);

    if (!foundTodo) {
      throw new NotFoundException(`Todo with id: ${id} not found.`);
    }

    return {
      message: `Todo with id: ${id} found successfully.`,
      foundTodo,
    };
  }

  async updateTodo(id: string, updateTodoDto: UpdateTodoDto) {
    if (Object.keys(updateTodoDto).length === 0) {
      throw new BadRequestException("Request body cannot be empty");
    }

    const todos = await this.dbService.readDataFromDb();
    const index = todos.findIndex((todo) => todo.id === id);

    if (index === -1) {
      throw new NotFoundException(`Todo with id: ${id} not found.`);
    }

    todos[index] = {
      ...todos[index],
      ...updateTodoDto,
      updated_at: new Date(),
    };

    await this.dbService.writeDataToDb(todos);

    return {
      message: `Todo with id: ${id} has been updated successfully.`,
      modifiedTodo: todos[index],
    };
  }

  async removeTodo(id: string) {
    const todos = await this.dbService.readDataFromDb();
    const index = todos.findIndex((todo) => todo.id === id);

    if (index === -1) {
      throw new NotFoundException(`Todo with id: ${id} not found.`);
    }

    const [removedTodo] = todos.splice(index, 1);
    await this.dbService.writeDataToDb(todos);

    return {
      message: `Todo with id: ${id} has been deleted successfully.`,
      removedTodo,
    };
  }
}
