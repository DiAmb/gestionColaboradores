import { Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/index";
import { error } from "../middlewares/errors";

const secret: string = config.jwt.secret;

interface DecodedToken extends JwtPayload {
  [key: string]: any;
}

export function asignarToken(data: object): string {
  return jwt.sign(data, secret);
}

export function verifyToken(token: string): DecodedToken {
  try {
    return jwt.verify(token, secret) as DecodedToken;
  } catch (err) {
    throw error("Token inválido", 401);
  }
}

export const checkToken = {
  confirmToken: (req: Request): DecodedToken => {
    const decoded = decodificarCabecera(req);
    return decoded;
  },
};

function obtenerToken(autorizacion: string): string {
  if (!autorizacion) {
    throw error("No permitido", 401);
  }

  if (!autorizacion.startsWith("Bearer ")) {
    throw error("Formato inválido", 401);
  }

  return autorizacion.replace("Bearer ", "");
}

function decodificarCabecera(req: Request): DecodedToken {
  const autorizacion = req.headers.authorization || "";
  const token = obtenerToken(autorizacion);
  const decodificado = verifyToken(token);

  (req as any).user = decodificado;
  return decodificado;
}
