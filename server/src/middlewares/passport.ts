import passport from "passport"
import passportJwt from "passport-jwt"
//strict code
import mongoose from "mongoose"
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
      const user = await User.findById(jwt_payload.userId).select("email id")

      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    } catch (e) {
      console.log(e)
    }
  }))
}
