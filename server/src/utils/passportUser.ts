import { Request } from "express"
import { UserDB } from "../middlewares/passport"

export function hasUser(request: Request): request is Request & { user: UserDB } {
  return 'user' in request
}