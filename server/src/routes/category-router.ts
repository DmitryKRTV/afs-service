import { Router } from "express";
import { categoryController } from "../controllers/category-controller";

export const categoryRouter = Router({});

categoryRouter.get("/", categoryController.getAll);
categoryRouter.get("/:id", categoryController.getById);
categoryRouter.delete("/:id", categoryController.remove);
categoryRouter.post("/", categoryController.create);
categoryRouter.patch("/:id", categoryController.update);
