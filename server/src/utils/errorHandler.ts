import { Response } from "express"

export const errorHandler = (res: Response, error: any) => {
  res.status(500).json({
    success: false,
    message: error.message ? error.message : "Some error occurred"
  })
}