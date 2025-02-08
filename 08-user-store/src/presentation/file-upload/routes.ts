import { Router } from "express";

import { FileUploadController } from "./controller";
import { FileUploadMiddleware } from "../middlewares/file-upload.middleware";
import { FileUploadService } from "../services/file-upload.service";
import { TypeMiddleware } from "../middlewares/type.middleware";

export class FileUploadRoutes {

    static get routes(): Router {
        const router = Router();
        const controller = new FileUploadController(
            new FileUploadService()
        );

        router.use(FileUploadMiddleware.containFiles);
        router.use(TypeMiddleware.validTypes(["users", "products", "categories"]));

        router.get("/single/:type", controller.uploadFile);
        router.get("/multiple/:type", controller.uploadMultipleFiles);

        return router;
    }
}