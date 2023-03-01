import { Types } from "mongoose"

export type TokenType = {
  email: string
  userId: Types.ObjectId
}