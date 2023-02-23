import { Router } from "express";
import { positionController } from "../controllers/position-controller";

export const positionRouter = Router({});

positionRouter.get("/:categoryId", positionController.getAll);
positionRouter.post("/", positionController.create);
positionRouter.patch("/:id", positionController.updateById);
positionRouter.delete("/:id", positionController.removeById);
