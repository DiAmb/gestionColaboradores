import express, { Request, Response, NextFunction } from "express";
import { success } from "../../red/response";
import controller from "./index";
import seguridad from "./seguridad";

const router = express.Router();

router.get("/", seguridad(), getEmpresas);
router.get("/:id", seguridad(), getEmpresaById);
router.post("/", seguridad(), createEmpresa);
router.put("/:id", seguridad(), updateEmpresa);
router.delete("/:id", seguridad(), deleteEmpresa);

async function getEmpresas(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const empresas = await controller.everyone();
    success(req, res, empresas, 200);
  } catch (error) {
    next(error);
  }
}

async function getEmpresaById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const empresa = await controller.one(parseInt(req.params.id));
    if (empresa) {
      success(req, res, empresa, 200);
    } else {
      success(req, res, "Empresa no encontrada", 404);
    }
  } catch (error) {
    next(error);
  }
}

async function createEmpresa(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const newEmpresaId = await controller.add(req.body);
    success(req, res, { id: newEmpresaId }, 201);
  } catch (error) {
    next(error);
  }
}

async function updateEmpresa(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await controller.update(parseInt(req.params.id), req.body);
    success(req, res, "Empresa actualizada con éxito", 200);
  } catch (error) {
    next(error);
  }
}

async function deleteEmpresa(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await controller.deletes(parseInt(req.params.id));
    success(req, res, "Empresa eliminada con éxito", 200);
  } catch (error) {
    next(error);
  }
}

export default router;
