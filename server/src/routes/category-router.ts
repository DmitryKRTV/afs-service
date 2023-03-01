import { Router } from "express"
import { categoryController } from "../controllers/category-controller"
import passport from "passport"

export const categoryRouter = Router({})

categoryRouter.get("/", passport.authenticate('jwt', { session: false }), categoryController.getAll)

categoryRouter.get("/:id", categoryController.getById)
categoryRouter.delete("/:id", categoryController.remove)
categoryRouter.post("/", categoryController.create)
categoryRouter.patch("/:id", categoryController.update)
