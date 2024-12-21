import { Injectable } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { Todo } from "./entities/todo.entity";
import { v4 as uuidv4 } from "uuid";
import { CsvService } from "./csv/csv.service";

@Injectable()
export class TodoService {
  private readonly csvFilePath = "./todos.csv";
  private readonly headers = ["id", "description", "created_at", "updated_at"];
  private todos: Todo[] = [];

  constructor(private readonly csvService: CsvService) {
    this.syncTodosFromCsv();
  }

  async syncTodosFromCsv(): Promise<Todo[]> {
    await this.csvService.ensureFileExists(this.csvFilePath, this.headers);

    try {
      const importedTodos = await this.csvService.readCsv(this.csvFilePath);
      this.todos = importedTodos.map((todo) => ({
        ...todo,
        created_at: new Date(todo.created_at),
        updated_at: new Date(todo.updated_at),
      }));
    } catch (error) {
      console.error("Error syncing todos from CSV: ", error);
    }
    return this.todos;
  }

  async syncTodosToCsv(): Promise<void> {
    try {
      console.info("syncTodosToCSV");
      await this.csvService.writeCsv(this.csvFilePath, this.todos);
    } catch (error) {
      console.error("Error syncing todos from CSV: ", error);
    }
  }

  async findAll() {
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
    await this.syncTodosFromCsv();
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

    await this.syncTodosToCsv();
    return this.todos[index];
  }

  async remove(id: string) {
    const index = this.todos.findIndex((todo) => todo.id === id);

    if (index === -1) {
      throw new Error(`todo with id: ${id} not found.`);
    }

    const removedTodo = this.todos.splice(index, 1);
    await this.syncTodosToCsv();
    return removedTodo;
  }
}
