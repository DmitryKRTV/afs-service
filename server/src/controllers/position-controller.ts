import { Request, Response } from "express";

export const positionController = {
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
  removeById(req: Request, res: Response) {
    res.status(200).json({
      removeById: true,
    });
  },
  updateById(req: Request, res: Response) {
    res.status(200).json({
      updateById: true,
    });
  },
};
