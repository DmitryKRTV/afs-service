import { Request, Response } from "express"
import { errorHandler } from "../utils/errorHandler"
import { Position } from "../models/Position.model"
import { hasUser } from "../utils/passportUser"

export const positionController = {
  async getByCategoryId(req: Request, res: Response) {
    try {
      if (hasUser(req)) {
        const positions = await Position.find({
          category: req.params.categoryId,
          user: req.user._id
        })
        res.status(200).json(positions)
      } else {
        throw new Error('Error occurred')
      }
    } catch (e) {
      errorHandler(res, e)
    }
  },
  async create(req: Request, res: Response) {
    try {
      const positions = await new Position({
        name: req.body.name,
        cost: req.body.cost,
        category: req.body.category,
        user: req.user
      }).save()
      res.status(201).json(positions)
    } catch (e) {
      errorHandler(res, e)
    }
  },
  async removeById(req: Request, res: Response) {
    try {
      await Position.remove({ _id: req.params.id })
      res.status(200).json({
        message: "Position has been removed"
      })
    } catch (e) {
      errorHandler(res, e)
    }
  },
  async updateById(req: Request, res: Response) {
    try {
      const positions = await Position.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      )
      res.status(200).json(positions)
    } catch (e) {
      errorHandler(res, e)
    }
  },
}
