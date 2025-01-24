import db from "../../database/mysql";

const TABLE_EMPRESA = "Empresa";

interface Empresa {
  id_empresa: number;
  razon_social_empresa: string;
  nombre_comercial_empresa?: string;
  nit_empresa: string;
  telefono_empresa?: string;
  correo_electronico_empresa?: string;
  id_municipio: number;
}

export default function () {
  /**
   * Obtener todas las empresas
   */
  async function everyone(): Promise<Empresa[]> {
    return db.getAll<Empresa>(TABLE_EMPRESA);
  }

  /**
   * Obtener una empresa por ID
   */
  async function one(id: number): Promise<Empresa | null> {
    return db.getOne<Empresa>(TABLE_EMPRESA, { id_empresa: id });
  }

  /**
   * Agregar una nueva empresa
   */
  async function add(data: Omit<Empresa, "id_empresa">): Promise<number> {
    return db.insert(TABLE_EMPRESA, data);
  }

  /**
   * Actualizar una empresa
   */
  async function update(
    id: number,
    data: Partial<Omit<Empresa, "id_empresa">>
  ): Promise<void> {
    await db.update(TABLE_EMPRESA, data, { id_empresa: id });
  }

  /**
   * Eliminar una empresa
   */
  async function deletes(id: number): Promise<void> {
    await db.remove(TABLE_EMPRESA, { id_empresa: id });
  }

  return {
    everyone,
    one,
    add,
    update,
    deletes,
  };
}
