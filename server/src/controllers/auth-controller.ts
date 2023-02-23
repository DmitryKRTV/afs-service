import { Request, Response } from "express";

export const authController = {
  login(req: Request, res: Response) {
    res.status(200).json({
      login: true,
    });
  },
  register(req: Request, res: Response) {
    res.status(200).json({
      register: "success",
    });
  },
};
