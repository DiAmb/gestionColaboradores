import bcrypt from "bcrypt";
import { asignarToken } from "../../token";
import db from "../../database/mysql";

const TABLE1 = "autenticacion";
const TABLE2 = "personal";

interface AuthData {
  id_personal: number;
  correo_autentificacion?: string;
  contrasena_autentificacion?: string;
}

interface PersonalData {
  id_cui_personal: number;
  estado_usuario: string;
}

interface TokenResponse {
  token: string;
  cui: number;
  insecure: boolean;
}

export default function () {
  async function encrypt(data: AuthData): Promise<AuthData> {
    const authData: AuthData = {
      id_personal: data.id_personal,
    };

    if (data.correo_autentificacion) {
      authData.correo_autentificacion = data.correo_autentificacion;
    }
    if (data.contrasena_autentificacion) {
      authData.contrasena_autentificacion = await bcrypt.hash(
        data.contrasena_autentificacion.toString(),
        10
      );
    }
    return authData;
  }

  async function resetPassword(
    body: AuthData,
    id_personal: number
  ): Promise<string | boolean> {
    try {
      const consultaPersonal = await db.getOne<PersonalData>(TABLE2, {
        id_cui_personal: id_personal,
      });

      if (!consultaPersonal) {
        return "Usuario inválido o permisos insuficientes.";
      }

      const authDataCryp = await encrypt({
        id_personal,
        correo_autentificacion: body.correo_autentificacion,
        contrasena_autentificacion: body.contrasena_autentificacion,
      });

      await db.remove(TABLE1, { id_personal });
      await db.insert(TABLE1, authDataCryp);

      return true;
    } catch (error) {
      console.error("Error al restablecer la contraseña:", error);
      throw new Error("Error interno al restablecer la contraseña.");
    }
  }

  async function login(
    correo: string,
    contrasena_autentificacion: string
  ): Promise<TokenResponse> {
    try {
      const data = await db.getOne<AuthData>(TABLE1, {
        correo_autentificacion: correo,
      });

      if (!data) {
        throw new Error("Usuario inválido o permisos insuficientes.");
      }

      const isDefaultPassword =
        contrasena_autentificacion === data.id_personal.toString();

      const passwordMatches = await bcrypt.compare(
        contrasena_autentificacion,
        data.contrasena_autentificacion || ""
      );

      if (!passwordMatches) {
        throw new Error("Credenciales inválidas.");
      }

      const personalData = await db.getOne<PersonalData>(TABLE2, {
        id_cui_personal: data.id_personal,
      });

      if (!personalData || personalData.estado_usuario === "0") {
        throw new Error("Usuario inválido o permisos insuficientes.");
      }

      const token = asignarToken({
        ...data,
      });

      return {
        token,
        cui: personalData.id_cui_personal,
        insecure: isDefaultPassword,
      };
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
      throw error;
    }
  }

  return {
    encrypt,
    resetPassword,
    login,
  };
}
