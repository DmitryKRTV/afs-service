import express, { Request, Response } from "express";
import { authRouter } from "./routes/auth-router";
import { analyticsRouter } from "./routes/analytics-router";
import { categoryRouter } from "./routes/category-router";
import { orderRouter } from "./routes/order-router";
import { positionRouter } from "./routes/position-router";

const app = express();
const port = 5000;

app.get("/", (req: Request, res: Response) => {
  const helloMessage = "Afs-service works!";
  res.status(200).send(helloMessage);
});

app.use("/auth", authRouter);
app.use("/analytics", analyticsRouter);
app.use("/category", categoryRouter);
app.use("/order", orderRouter);
app.use("/position", positionRouter);

const startApp = async () => {
  // await runDb()
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

startApp();
