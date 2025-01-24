import { checkToken } from "../../token";
import { error } from "../../middlewares/errors";
import { Request, Response, NextFunction } from "express";

export default function checkAuth() {
  function middleware(req: Request, res: Response, next: NextFunction): void {
    const rest = checkToken.confirmToken(req);
    if (rest.iat) {
      next();
    } else {
      throw error("Sin privilegios", 403);
    }
  }
  return middleware;
}
