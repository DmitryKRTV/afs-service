import { Router } from 'express'
import { analyticsController } from '../controllers/analytics-controller'
import passport from 'passport'

export const analyticsRouter = Router({})
analyticsRouter.get('/overview', passport.authenticate('jwt', { session: false }), analyticsController.overview)
analyticsRouter.get('/analytics', passport.authenticate('jwt', { session: false }), analyticsController.analytics)
