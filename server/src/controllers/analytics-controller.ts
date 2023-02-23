import { Request, Response } from "express";

export const analyticsController = {
  overview(req: Request, res: Response) {
    res.status(200).json({
      overview: true,
    });
  },
  analytics(req: Request, res: Response) {
    res.status(200).json({
      analytics: true,
    });
  },
};
