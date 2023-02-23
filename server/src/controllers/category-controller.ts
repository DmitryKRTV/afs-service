import { Request, Response } from "express";

export const categoryController = {
  getAll(req: Request, res: Response) {
    res.status(200).json({
      getAll: true,
    });
  },
  getById(req: Request, res: Response) {
    res.status(200).json({
      getById: true,
    });
  },
  remove(req: Request, res: Response) {
    res.status(200).json({
      remove: true,
    });
  },
  create(req: Request, res: Response) {
    res.status(200).json({
      create: true,
    });
  },
  update(req: Request, res: Response) {
    res.status(200).json({
      update: true,
    });
  },
};
