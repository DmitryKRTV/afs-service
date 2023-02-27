import { Request, Response } from "express"
import { User } from "../models/User.model"
import bcrypt from "bcryptjs"

export const authController = {
  login(req: Request, res: Response) {
    res.status(200).json({
      login: {
        email: req.body.email,
        password: req.body.password,
      },
    })
  },
  async register(req: Request, res: Response) {
    const candidate = await User.findOne({
      email: req.body.email,
    })
    if (candidate) {
      res.status(409).json({
        message: "The email is already registered",
      })
    } else {
      const salt = bcrypt.genSaltSync(10)
      const user = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, salt)
      })
      try {
        await user.save()
        res.status(201).json(user)
      } catch (e) {
        res.status(404).json({
          message: "error occurred"
        })
      }
    }
  }
}
