import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { TodoService } from "./todo.service";

@Controller("todo")
export class TodoController {
  // prettier-ignore
  constructor(private readonly todoService: TodoService) { }

  @Post()
  async create(@Body(new ValidationPipe()) createTodoDto: CreateTodoDto) {
    if (Object.keys(createTodoDto).length === 0) {
      throw new BadRequestException("Request body cannot be empty");
    }

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
    if (Object.keys(updateTodoDto).length === 0) {
      throw new BadRequestException("Request body cannot be empty");
    }

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
      if (error.message.includes("not found")) {
        throw new NotFoundException(`Todo with id ${id} not found.`);
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
