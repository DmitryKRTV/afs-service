import { Request, Response } from "express";

export const authController = {
  login(req: Request, res: Response) {
    res.status(200).json({
      login: {
        email: req.body.email,
        password: req.body.password,
      },
    });
  },
  register(req: Request, res: Response) {
    res.status(200).json({
      register: "success",
    });
  },
};
