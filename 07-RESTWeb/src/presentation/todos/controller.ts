import { Request, Response } from "express";

import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { prisma } from "../../data/postgres";
import { TodoRepository } from "../../domain";

export class TodosController {

    constructor(
        private readonly todoRepository: TodoRepository
    ) {}

    public async getTodos(req: Request, res: Response) {
        const todos = await this.todoRepository.getAll();

        return res.json(todos);
    }

    public async getTodoById(req: Request, res: Response) {
        const id = +req.params.id;
        
        try {
            const todo = await this.todoRepository.findById(id);

            res.json(todo);
        } catch (error) {
            res.status(400).json({ error });
        }
    }

    public async createTodo(req: Request, res: Response) {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if(error) return res.status(400).json({ error });

        const todo = await this.todoRepository.create(createTodoDto!);

        return res.json(todo);
    }

    public async updateTodo(req: Request, res: Response) {
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({
            ...req.body,
            id
        });

        if(error) return res.status(400).json({ error });

        const updatedTodo = await this.todoRepository.updateById(updateTodoDto!);

        return res.json(updatedTodo);
    }

    public async deleteTodo(req: Request, res: Response) {
        const id = +req.params.id;
        const deletedTodo = await this.todoRepository.deleteById(id);

        return res.json(deletedTodo);
    }
}