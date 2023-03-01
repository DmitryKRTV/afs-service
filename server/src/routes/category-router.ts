import { Router } from "express"
import { categoryController } from "../controllers/category-controller"
import passport from "passport"
import { multerMiddleware } from "../middlewares/upload"

export const categoryRouter = Router({})

categoryRouter.get("/", passport.authenticate('jwt', { session: false }), categoryController.getAll)

categoryRouter.get("/:id", passport.authenticate('jwt', { session: false }), categoryController.getById)
categoryRouter.delete("/:id", passport.authenticate('jwt', { session: false }), categoryController.remove)
categoryRouter.post("/", passport.authenticate('jwt', { session: false }), multerMiddleware.single('image'), categoryController.create)
categoryRouter.patch("/:id", passport.authenticate('jwt', { session: false }), multerMiddleware.single('image'), categoryController.update)
