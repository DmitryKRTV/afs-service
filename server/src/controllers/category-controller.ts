import { Request, Response } from "express"
import { errorHandler } from "../utils/errorHandler"
import { Category } from "../models/Category.model"
import { hasUser } from "../utils/passportUser"
import { Position } from "../models/Position.model"

export const categoryController = {
  async getAll(req: Request, res: Response) {
    try {
      if (hasUser(req)) {
        const categories = await Category.find({ user: req.user._id })
        res.status(200).json(categories)
      } else {
        throw new Error('Error occurred')
      }
    } catch (e) {
      errorHandler(res, e)
    }
  },
  async getById(req: Request, res: Response) {
    try {
      const categories = await Category.findById(req.params.id)
      res.status(200).json(categories)
    } catch (e) {
      errorHandler(res, e)
    }
  },
  async remove(req: Request, res: Response) {
    try {
      await Category.remove({ _id: req.params.id })
      await Position.remove({ category: req.params.id })
      res.status(200).json({
        message: "success"
      })
    } catch (e) {
      errorHandler(res, e)
    }
  },
  async create(req: Request, res: Response) {
    try {
      if (hasUser(req)) {
        const category = new Category({
          name: req.body.name,
          user: req.user._id,
          imageSrc: req.file ? req.file.path : ''
        })
        await category.save()
        res.status(201).json(category)
      } else {
        throw new Error('Error occurred')
      }
    } catch (e) {
      errorHandler(res, e)
    }
  },
  async update(req: Request, res: Response) {
    try {
      if (hasUser(req)) {
        const updated = {
          name: req.body.name,
          imageSrc: ''
        }
        if (req.file) {
          updated.imageSrc = req.file.path
        }
        const categories = await Category.findOneAndUpdate({ id: req.params.id },
          { $set: updated },
          { new: true })
        res.status(200).json(categories)
      } else {
        throw new Error('Error occurred')
      }
    } catch (e) {
      errorHandler(res, e)
    }
  },
}
