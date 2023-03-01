import passport from "passport"
import passportJwt from "passport-jwt"
//strict code
import mongoose, { Types } from "mongoose"
import { TokenType } from "../models/Token.model"

export const createJwtMiddleware = () => {
  const User = mongoose.model('users')

  const JwtStrategy = passportJwt.Strategy
  const ExtractJwt = passportJwt.ExtractJwt

  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT || "AFS"
  }

  passport.use(new JwtStrategy(options, async (jwt_payload: TokenType, done) => {
    try {
      const user: UserDB = await User.findById(jwt_payload.userId).select("email id")
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    } catch (e) {
      console.log(e)
    }
  }))
}

export interface UserDB {
  _id: Types.ObjectId
  email: string
}
