import { Router } from "express";
import { orderController } from "../controllers/order-controller";

export const orderRouter = Router({});

orderRouter.get("/", orderController.getAll);
orderRouter.post("/", orderController.create);
