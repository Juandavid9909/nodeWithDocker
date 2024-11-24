import { Router } from "express";

import { TodoDataSourceImpl } from "../../infrastructure/datasources/todo.datasource.impl";
import { TodoRepositoryImpl } from '../../infrastructure/repositories/todo.repository.impl';
import { TodosController } from "./controller";

export class TodoRoutes {

    public static get routes(): Router {
        const router = Router();

        const datasource = new TodoDataSourceImpl();
        const todoRepository = new TodoRepositoryImpl(datasource);

        const todoController = new TodosController(todoRepository);

        router.get("/", todoController.getTodos);
        router.get("/:id", todoController.getTodoById);
        router.post("/", todoController.createTodo);
        router.put("/:id", todoController.updateTodo);
        router.delete("/:id", todoController.deleteTodo);

        return router;
    }
}