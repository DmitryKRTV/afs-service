import express, { Request, Response } from "express";

const app = express();
const port = 4200;

app.get("/", (req: Request, res: Response) => {
  const helloMessage = "hello afs-service!";
  res.send(helloMessage);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
