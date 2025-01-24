import { Request, Response, NextFunction } from "express";
import { error as responseError } from "./response";

function errors(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error("[error]", err);

  const message = err.message || "Error interno";
  const status = err.statusCode || 500;

  responseError(req, res, message, status);
}

export default errors;
