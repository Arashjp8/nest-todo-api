import { Injectable } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { Todo } from "./entities/todo.entity";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class TodoService {
  private todos: Todo[] = [];

  create(createTodoDto: CreateTodoDto) {
    const newTodo: Todo = {
      ...createTodoDto,
      id: uuidv4(),
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.todos.push(newTodo);
    return {
      newTodo,
    };
  }

  findAll() {
    return this.todos;
  }

  findOne(id: string) {
    const foundTodo = this.todos.find((todo) => todo.id === id);

    if (!foundTodo) {
      throw new Error(`todo with id: ${id} not found.`);
    }

    return foundTodo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
