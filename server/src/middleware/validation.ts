import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";
import AppError from "./errorHadler";

export const validation = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = schema.safeParse(req.body);
    console.log(result.error?.errors);
    if (!result.success) {
      return next(new AppError(result.error.errors.map((err) => `${err.path.join(".")}: ${err.message}`).join(", "), 400));
    }
    next();
  } catch (error) {
    next(error);
  }
};
