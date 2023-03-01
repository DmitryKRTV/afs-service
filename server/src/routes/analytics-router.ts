import { Router } from "express"
import { analyticsController } from "../controllers/analytics-controller"

export const analyticsRouter = Router({})

analyticsRouter.get("/overview", analyticsController.overview)
analyticsRouter.get("/analytics", analyticsController.analytics)
