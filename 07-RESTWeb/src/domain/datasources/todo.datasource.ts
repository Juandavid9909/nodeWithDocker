import { CreateTodoDto, UpdateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodoDataSource {

    public abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>;

    public abstract getAll(): Promise<TodoEntity[]>;

    public abstract findById(id: number): Promise<TodoEntity>;

    public abstract updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>;

    public abstract deleteById(id: number): Promise<TodoEntity>;
}