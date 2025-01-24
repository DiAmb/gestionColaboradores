import { Request, Response } from "express";

export const success = (
  req: Request,
  res: Response,
  mensaje: string | object = "Éxito",
  status: number = 200
): void => {
  res.status(status).send({
    error: false,
    status: status,
    body: mensaje,
  });
};

export const error = (
  req: Request,
  res: Response,
  mensaje: string = "Error interno",
  status: number = 500
): void => {
  res.status(status).send({
    error: true,
    status: status,
    body: mensaje,
  });
};
