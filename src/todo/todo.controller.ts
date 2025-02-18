import {
    Body,
    Controller,
    Delete,
    Get,
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
        return await this.todoService.createNewTodo(createTodoDto);
    }

    @Get()
    async findAll() {
        return await this.todoService.findAllTodos();
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
        return await this.todoService.findOneTodo(id);
    }

    @Patch(":id")
    async update(
        @Param("id") id: string,
        @Body(new ValidationPipe()) updateTodoDto: UpdateTodoDto,
    ) {
        return await this.todoService.updateTodo(id, updateTodoDto);
    }

    @Delete(":id")
    async remove(@Param("id") id: string) {
        return await this.todoService.removeTodo(id);
    }
}
