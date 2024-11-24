import { CreateTodoDto, TodoDataSource, TodoEntity, UpdateTodoDto } from "../../domain";
import { prisma } from "../../data/postgres";

export class TodoDataSourceImpl implements TodoDataSource {

    public create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        throw new Error("Method not implemented.");
    }

    public async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();

        return todos.map((todo) => TodoEntity.fromObject(todo));
    }

    public getById(id: number): Promise<TodoEntity> {
        throw new Error("Method not implemented.");
    }

    public updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        throw new Error("Method not implemented.");
    }

    public deleteById(id: number): Promise<TodoEntity> {
        throw new Error("Method not implemented.");
    }
}