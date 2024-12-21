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
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createTodoDto: CreateTodoDto) {
    try {
      return await this.todoService.create(createTodoDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get()
  findAll() {
    try {
      return this.todoService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    try {
      return this.todoService.findOne(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateTodoDto: UpdateTodoDto) {
    try {
      return await this.todoService.update(id, updateTodoDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    try {
      return await this.todoService.remove(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
