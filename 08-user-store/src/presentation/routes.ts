import { Router } from "express";

import { AuthRoutes } from "./auth/routes";
import { CategoryRoutes } from "./category/routes";
import { FileUploadRoutes } from "./file-upload/routes";
import { ImageRoutes } from "./images/routes";
import { ProductRoutes } from "./products/routes";

export class AppRoutes {

  static get routes(): Router {
    const router = Router();

    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api/categories", CategoryRoutes.routes);
    router.use("/api/products", ProductRoutes.routes);
    router.use("/api/upload", FileUploadRoutes.routes);
    router.use("/api/images", ImageRoutes.routes);

    return router;
  }
}