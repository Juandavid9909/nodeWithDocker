import { Router } from "express";

import { FileUploadController } from "./controller";

export class FileUploadRoutes {

    static get routes(): Router {
        const router = Router();
        const controller = new FileUploadController();

        router.get("/single/:type", controller.uploadFile);
        router.get("/multiple/:type", controller.uploadMultipleFiles);

        return router;
    }
}