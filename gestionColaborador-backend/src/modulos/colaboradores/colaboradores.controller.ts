import db from "../../database/mysql";
const TABLE_COLABORADOR = "Colaborador";
const TABLE_RELATION = "ColaboradorEmpresa";
const VIEW_COLABORADOR = "VistaColaboradoresEmpresas";

interface Colaborador {
  id_cui_colaborador: number;
  nombres_colaborador: string;
  apellidos_colaborador: string;
  fecha_nacimiento_colaborador: Date;
  telefono_colaborador?: string;
  correo_electronico_colaborador?: string;
}

interface ColaboradorEmpresa {
  id: number;
  id_colaborador: number;
  id_empresa: number;
}

export default function () {
  /**
   * Obtener todos los colaboradores
   */
  async function everyone(): Promise<
    Array<
      Colaborador & {
        empresas: Array<{ id_empresa: number; razon_social_empresa: string }>;
      }
    >
  > {
    const data = await db.getAll<any>(VIEW_COLABORADOR);

    const colaboradoresMap = new Map<
      number,
      Colaborador & { empresas: any[] }
    >();

    data.forEach((row) => {
      if (!colaboradoresMap.has(row.id_cui_colaborador)) {
        colaboradoresMap.set(row.id_cui_colaborador, {
          id_cui_colaborador: row.id_cui_colaborador,
          nombres_colaborador: row.nombres_colaborador,
          apellidos_colaborador: row.apellidos_colaborador,
          fecha_nacimiento_colaborador: row.fecha_nacimiento_colaborador,
          telefono_colaborador: row.telefono_colaborador,
          correo_electronico_colaborador: row.correo_electronico_colaborador,
          empresas: [],
        });
      }
      if (row.id_empresa) {
        colaboradoresMap.get(row.id_cui_colaborador)?.empresas.push({
          id_empresa: row.id_empresa,
          razon_social_empresa: row.razon_social_empresa,
          nombre_comercial_empresa: row.nombre_comercial_empresa,
        });
      }
    });

    return Array.from(colaboradoresMap.values());
  }

  /**
   * Obtener un colaborador por ID (incluyendo sus empresas asociadas)
   */
  async function one(
    id: number
  ): Promise<(Colaborador & { empresas?: number[] }) | null> {
    try {
      const colaborador = await db.getOne<Colaborador>(TABLE_COLABORADOR, {
        id_cui_colaborador: id,
      });

      if (!colaborador) return null;

      const empresas = await db.getAll<ColaboradorEmpresa>(
        TABLE_RELATION,
        `WHERE id_colaborador = ${id}`
      );

      return {
        ...colaborador,
        empresas: empresas.map((e) => e.id_empresa),
      };
    } catch (error) {
      console.error("Error al obtener un colaborador:", error);
      throw error;
    }
  }

  /**
   * Agregar un nuevo colaborador
   */
  async function add(
    data: Colaborador & { empresas?: number[] }
  ): Promise<number> {
    try {
      const { empresas, ...colaboradorData } = data;
      const colaboradorId = await db.insert(TABLE_COLABORADOR, colaboradorData);

      if (empresas && empresas.length > 0) {
        const relations = empresas.map((id_empresa) => ({
          id_colaborador: colaboradorId,
          id_empresa,
        }));
        await db.insertMultiple(TABLE_RELATION, relations);
      }

      return colaboradorId;
    } catch (error) {
      console.error("Error al agregar colaborador:", error);
      throw error;
    }
  }

  /**
   * Actualizar un colaborador y sus empresas asociadas
   */
  async function update(
    id: number,
    data: Partial<Colaborador & { empresas?: number[] }>
  ): Promise<void> {
    try {
      const { empresas, ...colaboradorData } = data;

      if (Object.keys(colaboradorData).length > 0) {
        await db.update(TABLE_COLABORADOR, colaboradorData, {
          id_cui_colaborador: id,
        });
      }

      if (empresas) {
        await db.remove(TABLE_RELATION, { id_colaborador: id });
        if (empresas.length > 0) {
          const relations = empresas.map((id_empresa) => ({
            id_colaborador: id,
            id_empresa,
          }));
          await db.insertMultiple(TABLE_RELATION, relations);
        }
      }
    } catch (error) {
      console.error("Error al actualizar colaborador:", error);
      throw error;
    }
  }

  /**
   * Eliminar un colaborador y sus asociaciones con empresas
   */
  async function deletes(id: number): Promise<void> {
    try {
      await db.remove(TABLE_COLABORADOR, { id_cui_colaborador: id });

      const hasRelations = await db.getOne(TABLE_RELATION, {
        id_colaborador: id,
      });

      if (hasRelations) {
        await db.remove(TABLE_RELATION, { id_colaborador: id });
      }
    } catch (error) {
      console.error("Error al eliminar colaborador:", error);
      throw error;
    }
  }

  return {
    everyone,
    one,
    add,
    update,
    deletes,
  };
}
