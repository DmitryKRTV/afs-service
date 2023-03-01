import { Request, Response } from "express"
import { User } from "../models/User.model"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { TokenType } from "../models/Token.model"
import { errorHandler } from "../utils/errorHandler"

export const authController = {
  async login(req: Request, res: Response) {
    const candidate = await User.findOne({
      email: req.body.email,
    })
    if (candidate) {
      const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
      if (passwordResult) {
        const token = jwt.sign({
          email: candidate.email,
          userId: candidate._id
        } as TokenType, process.env.JWT || "AFS", { expiresIn: 3600 })

        res.status(200).json({
          token: `Bearer ${token}`
        })

      } else {
        res.status(401).json({
          message: "User not found"
        })
      }
    } else {
      res.status(404).json({
        message: "User not found"
      })
    }
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
        errorHandler(res, e)
      }
    }
  }
}
