import db from "../../database/mysql"; // Importar las funciones de la base de datos
import bcrypt from "bcrypt";

const TABLE_PERSONAL = "personal";
const TABLE_AUTH = "autenticacion";

interface Personal {
  id_cui_personal: number;
  nombres_personal: string;
  apellidos_personal: string;
  sexo_personal: string;
  fecha_nacimiento_personal: Date;
  telefono_personal: string;
  estado_personal: boolean;
}

interface Auth {
  id_personal: number;
  correo_autentificacion: string;
  contrasena_autentificacion: string;
}

export default function () {
  /**
   * Obtener todos los registros de la tabla personal
   */
  async function everyone(): Promise<Personal[]> {
    return await db.getAll<Personal>(TABLE_PERSONAL);
  }

  /**
   * Obtener un registro específico por su CUI
   * @param cui - CUI del personal
   */
  async function one(
    cui: number
  ): Promise<(Personal & { correo_autentificacion?: string }) | null> {
    try {
      const authResult = await db.getOne<Auth>(TABLE_AUTH, {
        id_personal: cui,
      });
      const correo_autentificacion =
        authResult?.correo_autentificacion || undefined;

      const personalResult = await db.getOne<Personal>(TABLE_PERSONAL, {
        id_cui_personal: cui,
      });

      return personalResult
        ? { ...personalResult, correo_autentificacion }
        : null;
    } catch (error) {
      console.error("Error al obtener un registro:", error);
      throw error;
    }
  }

  /**
   * Eliminar registros de las tablas personal y autenticacion
   * @param id - CUI del personal
   */
  async function deletes(id: number): Promise<void> {
    try {
      await Promise.all([db.remove(TABLE_PERSONAL, { id_cui_personal: id })]);
    } catch (error) {
      console.error("Error al eliminar registros:", error);
      throw error;
    }
  }

  /**
   * Actualizar datos de un registro en la tabla personal
   * @param data - Datos a actualizar
   * @param id - CUI del personal
   */
  async function update(
    data: Partial<Personal & { correo_autentificacion?: string }>,
    id: number
  ): Promise<void> {
    try {
      if (!data.correo_autentificacion) {
        await db.update(TABLE_PERSONAL, data, { id_cui_personal: id });
        return;
      }

      let authRecord = await db.getOne<Auth>(TABLE_AUTH, { id_personal: id });
      if (!authRecord) {
        const authData: Auth = {
          id_personal: id,
          correo_autentificacion: data.correo_autentificacion,
          contrasena_autentificacion: await bcrypt.hash(id.toString(), 10),
        };
        await db.insert(TABLE_AUTH, authData);
      } else if (
        authRecord.correo_autentificacion !== data.correo_autentificacion
      ) {
        await db.remove(TABLE_AUTH, { id_personal: id });
        authRecord = {
          ...authRecord,
          correo_autentificacion: data.correo_autentificacion,
        };
        await db.insert(TABLE_AUTH, authRecord);
      }

      delete data.correo_autentificacion;
      await db.update(TABLE_PERSONAL, data, { id_cui_personal: id });
    } catch (error) {
      console.error("Error al actualizar el registro:", error);
      throw error;
    }
  }

  /**
   * Agregar un nuevo registro
   * @param body - Datos del nuevo registro
   */
  async function add(
    body: Personal & { correo_autentificacion?: string }
  ): Promise<number> {
    try {
      if (body.correo_autentificacion && body.id_cui_personal) {
        const authData: Auth = {
          id_personal: body.id_cui_personal,
          correo_autentificacion: body.correo_autentificacion,
          contrasena_autentificacion: await bcrypt.hash(
            body.id_cui_personal.toString(),
            10
          ),
        };

        delete body.correo_autentificacion;

        return await db.insert(TABLE_PERSONAL, body).then(async (id) => {
          await db.insert(TABLE_AUTH, authData);
          return id;
        });
      } else {
        return await db.insert(TABLE_PERSONAL, body);
      }
    } catch (error) {
      console.error("Error al agregar el registro:", error);
      throw error;
    }
  }

  return {
    everyone,
    one,
    deletes,
    update,
    add,
  };
}
