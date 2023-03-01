import { Router } from "express"
import { positionController } from "../controllers/position-controller"
import passport from "passport"

export const positionRouter = Router({})

positionRouter.get("/:categoryId", passport.authenticate('jwt', { session: false }), positionController.getByCategoryId)
positionRouter.post("/", passport.authenticate('jwt', { session: false }), positionController.create)
positionRouter.patch("/:id", passport.authenticate('jwt', { session: false }), positionController.updateById)
positionRouter.delete("/:id", passport.authenticate('jwt', { session: false }), positionController.removeById)
