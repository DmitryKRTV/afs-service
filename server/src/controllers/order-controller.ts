import { Request, Response } from "express";

export const orderController = {
  getAll(req: Request, res: Response) {
    res.status(200).json({
      getAll: true,
    });
  },
  create(req: Request, res: Response) {
    res.status(200).json({
      create: true,
    });
  },
};
