import express, { Request, Response, NextFunction } from "express";
import { success } from "../../red/response"; // Importar la función 'success'
import controller from "./index";
import seguridad from "./seguridad"; // Middleware de seguridad

const router = express.Router();

// Definir las rutas
router.get("/", seguridad(), getEmpleados);
router.get("/:id", seguridad(), getEmpleadoById);
router.post("/", seguridad(), createEmpleado);
router.put("/:id", seguridad(), updateEmpleado);
router.delete("/:id", seguridad(), deleteEmpleado);

async function getEmpleados(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const empleados = await controller.everyone();
    success(req, res, empleados, 200);
  } catch (error) {
    next(error);
  }
}

async function getEmpleadoById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const empleado = await controller.one(parseInt(req.params.id));
    if (empleado) {
      success(req, res, empleado, 200);
    } else {
      success(req, res, "Empleado no encontrado", 404);
    }
  } catch (error) {
    next(error);
  }
}

async function createEmpleado(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const newEmpleado = await controller.add(req.body);
    success(req, res, JSON.stringify(newEmpleado), 201);
  } catch (error) {
    next(error);
  }
}

async function updateEmpleado(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const updatedEmpleado = await controller.update(
      req.body,
      parseInt(req.params.id)
    );
    success(req, res, JSON.stringify(updatedEmpleado), 200);
  } catch (error) {
    next(error);
  }
}

async function deleteEmpleado(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await controller.deletes(parseInt(req.params.id));
    success(req, res, "Empleado eliminado exitosamente", 200);
  } catch (error) {
    next(error);
  }
}

export default router;
