import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { Todo } from "./entities/todo.entity";

@Injectable()
export class TodoService {
    // prettier-ignore
    constructor(@InjectRepository(Todo) private todoRepository: Repository<Todo>) { }

    async findAllTodos(): Promise<Todo[]> {
        return await this.todoRepository.find();
    }

    async createNewTodo(createTodoDto: CreateTodoDto) {
        if (Object.keys(createTodoDto).length === 0) {
            throw new BadRequestException("Request body cannot be empty");
        }

        const newTodo = this.todoRepository.create({
            ...createTodoDto,
            created_at: new Date(),
            updated_at: new Date(),
        });

        await this.todoRepository.save(newTodo);

        return {
            message: `Todo has been successfully created.`,
        };
    }

    async findOneTodo(id: string) {
        const foundTodo = await this.todoRepository.findOne({ where: { id } });

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

        const existingTodo = await this.todoRepository.findOne({
            where: { id },
        });

        if (!existingTodo) {
            throw new NotFoundException(`Todo with id: ${id} not found.`);
        }

        await this.todoRepository.update(id, {
            ...updateTodoDto,
            updated_at: new Date(),
        });

        return {
            message: `Todo with id: ${id} has been updated successfully.`,
        };
    }

    async removeTodo(id: string) {
        const existingTodo = this.todoRepository.findOne({ where: { id } });

        if (!existingTodo) {
            throw new NotFoundException(`Todo with id: ${id} not found.`);
        }

        await this.todoRepository.delete(id);

        return {
            message: `Todo with id: ${id} has been deleted successfully.`,
        };
    }
}
