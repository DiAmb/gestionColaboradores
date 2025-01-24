import express, { Request, Response, NextFunction } from "express";
import { success } from "../../red/response";
import controller from "./index";
import seguridad from "./seguridad";

const router = express.Router();

router.get("/", seguridad(), getColaboradores);
router.get("/:id", seguridad(), getColaboradorById);
router.post("/", seguridad(), createColaborador);
router.put("/:id", seguridad(), updateColaborador);
router.delete("/:id", seguridad(), deleteColaborador);

async function getColaboradores(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const colaboradores = await controller.everyone();
    success(req, res, colaboradores, 200);
  } catch (error) {
    next(error);
  }
}

async function getColaboradorById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const colaborador = await controller.one(parseInt(req.params.id));
    if (colaborador) {
      success(req, res, colaborador, 200);
    } else {
      success(req, res, "Colaborador no encontrado", 404);
    }
  } catch (error) {
    next(error);
  }
}

async function createColaborador(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const newColaboradorId = await controller.add(req.body);
    success(req, res, { id: newColaboradorId }, 201);
  } catch (error) {
    next(error);
  }
}

async function updateColaborador(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await controller.update(parseInt(req.params.id), req.body);
    success(req, res, "Colaborador actualizado con éxito", 200);
  } catch (error) {
    next(error);
  }
}

async function deleteColaborador(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await controller.deletes(parseInt(req.params.id));
    success(req, res, "Colaborador eliminado con éxito", 200);
  } catch (error) {
    next(error);
  }
}

export default router;
