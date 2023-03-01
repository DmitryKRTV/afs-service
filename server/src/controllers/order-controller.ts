import { Request, Response } from "express"
import { hasUser } from "../utils/passportUser"
import { errorHandler } from "../utils/errorHandler"
import { Order } from "../models/Order.model"

export const orderController = {
  async getAll(req: Request, res: Response) {

    try {
      if (hasUser(req)) {
        const query = {
          user: req.user._id,
          date: {
            $gte: {}
          },
          order: {}
        } as any

        if (req.query.start) {
          query.date = {
            $gte: req.query.start
          }
        }

        if (req.query.end) {
          if (!query.date) {
            query.date = {}
          }

          query.date['$lte'] = req.query.end
        }

        if (req.query.order) {
          query.order = +req.query.order
        }

        const orders = await Order
          .find(query)
          .sort({ date: -1 })
          .skip(req.query.offset ? +req.query.offset : 0)
          .limit(req.query.limit ? +req.query.limit : 5)

        res.status(200).json(orders)
      } else {
        throw new Error('Error occurred')
      }

    } catch (e) {
      errorHandler(res, e)
    }

  },
  async create(req: Request, res: Response) {
    try {
      if (hasUser(req)) {
        const lastOrder = await Order
          .findOne({ user: req.user._id })
          .sort({ date: -1 })

        const maxOrder = lastOrder ? lastOrder.order : 0

        const order = await new Order({
          list: req.body.list,
          user: req.user._id,
          order: maxOrder + 1
        }).save()

        res.status(201).json(order)
      } else {
        throw new Error('Error occurred')
      }
    } catch (e) {
      errorHandler(res, e)
    }
  },
}
