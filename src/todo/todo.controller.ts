import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  NotFoundException,
  InternalServerErrorException,
} from "@nestjs/common";
import { TodoService } from "./todo.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";

@Controller("todo")
export class TodoController {
  // prettier-ignore
  constructor(private readonly todoService: TodoService) { }

  @Post()
  async create(@Body(new ValidationPipe()) createTodoDto: CreateTodoDto) {
    try {
      return await this.todoService.createNewTodo(createTodoDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.todoService.findAllTodos();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    try {
      return await this.todoService.findOneTodo(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body(new ValidationPipe()) updateTodoDto: UpdateTodoDto,
  ) {
    try {
      return await this.todoService.updateTodo(id, updateTodoDto);
    } catch (error) {
      if (error.message.includes("not found")) {
        throw new NotFoundException(`Todo with id ${id} not found.`);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    try {
      return await this.todoService.removeTodo(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
