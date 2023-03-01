import { Router } from "express"
import { orderController } from "../controllers/order-controller"
import passport from "passport"

export const orderRouter = Router({})

orderRouter.get("/", passport.authenticate('jwt', { session: false }), orderController.getAll)
orderRouter.post("/", passport.authenticate('jwt', { session: false }), orderController.create)
