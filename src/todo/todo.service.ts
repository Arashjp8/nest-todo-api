import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { Todo } from "./entities/todo.entity";

@Injectable()
export class TodoService {
  private todos: Todo[] = [];

  async findAll() {
    console.log("\n **TODOS** \n", this.todos);
    return this.todos;
  }

  async create(createTodoDto: CreateTodoDto) {
    const newTodo: Todo = {
      ...createTodoDto,
      id: uuidv4(),
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.todos.push(newTodo);
    return { newTodo };
  }

  async findOne(id: string) {
    const foundTodo = this.todos.find((todo) => todo.id === id);

    if (!foundTodo) {
      throw new Error(`todo with id: ${id} not found.`);
    }
    return foundTodo;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const index = this.todos.findIndex((todo) => todo.id === id);

    if (index === -1) {
      throw new Error(`todo with id: ${id} not found.`);
    }

    this.todos[index] = {
      ...this.todos[index],
      ...updateTodoDto,
      updated_at: new Date(),
    };

    return this.todos[index];
  }

  async remove(id: string) {
    const index = this.todos.findIndex((todo) => todo.id === id);

    if (index === -1) {
      throw new Error(`todo with id: ${id} not found.`);
    }

    const removedTodo = this.todos.splice(index, 1);
    return removedTodo;
  }
}
