import express, { Request, Response, NextFunction } from "express";
import { success } from "../../red/response"; // Importar la función 'success' correctamente
import controller from "./index";
import seguridad from "./seguridad";

const router = express.Router();

// Definir las rutas
router.post("/", login);
router.post("/reset/:id", seguridad(), resetPassword);

async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = await controller.login(req.body.correo, req.body.contrasena);
    success(req, res, token, 200);
  } catch (error) {
    next(error);
  }
}

async function resetPassword(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = await controller.resetPassword(
      req.body,
      parseInt(req.params.id)
    );
    success(req, res, JSON.stringify(token), 200);
  } catch (error) {
    next(error);
  }
}

export default router;
