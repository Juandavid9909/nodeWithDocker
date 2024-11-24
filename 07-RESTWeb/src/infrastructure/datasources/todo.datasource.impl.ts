import { CreateTodoDto, TodoDataSource, TodoEntity, UpdateTodoDto } from "../../domain";
import { prisma } from "../../data/postgres";

export class TodoDataSourceImpl implements TodoDataSource {

    public async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const todo = await prisma.todo.create({
            data: createTodoDto!
        });

        return TodoEntity.fromObject(todo);
    }

    public async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();

        return todos.map((todo) => TodoEntity.fromObject(todo));
    }

    public async findById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findFirst({
            where: { id }
        });

        if(!todo) throw `TODO with id ${ id } not found`;

        return TodoEntity.fromObject(todo);
    }

    public async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        await this.findById(updateTodoDto.id);

        const updatedTodo = await prisma.todo.update({
            where: {  id: updateTodoDto.id},
            data: updateTodoDto!.values
        });

        return TodoEntity.fromObject(updatedTodo);
    }

    public async deleteById(id: number): Promise<TodoEntity> {
        await this.findById(id);

        const deletedTodo = await prisma.todo.delete({
            where: { id }
        });

        return TodoEntity.fromObject(deletedTodo);
    }
}