import * as dotenv from 'dotenv'
import express, { Request, Response } from "express"
import bodyParser from "body-parser"
import morgan from "morgan"
import cors from "cors"
import { authRouter } from "./routes/auth-router"
import { analyticsRouter } from "./routes/analytics-router"
import { categoryRouter } from "./routes/category-router"
import { orderRouter } from "./routes/order-router"
import { positionRouter } from "./routes/position-router"
import { runDb } from "./repositories/db"
import passport from "passport"
import { createJwtMiddleware } from "./middlewares/passport"

dotenv.config()
const app = express()
const port = 5000

app.use(morgan("dev"))
app.use(cors())
app.use(passport.initialize())
createJwtMiddleware()

app.get("/", (req: Request, res: Response) => {
  const helloMessage = "Afs-service works!"
  res.status(200).send(helloMessage)
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use("/auth", authRouter)
app.use("/analytics", analyticsRouter)
app.use("/category", categoryRouter)
app.use("/order", orderRouter)
app.use("/position", positionRouter)

const startApp = async () => {
  await runDb()
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

startApp()
