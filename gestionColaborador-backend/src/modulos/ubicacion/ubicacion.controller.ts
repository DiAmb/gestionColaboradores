import db from "../../database/mysql";

const TABLE_PAIS = "Pais";
const TABLE_DEPARTAMENTO = "Departamento";
const TABLE_MUNICIPIO = "Municipio";

interface Pais {
  id_pais: number;
  nombre_pais: string;
}

interface Departamento {
  id_departamento: number;
  nombre_departamento: string;
  id_pais: number;
}

interface Municipio {
  id_municipio: number;
  nombre_municipio: string;
  id_departamento: number;
}

export default function () {
  /**
   * Obtener todos los países
   */
  async function getAllPaises(): Promise<Pais[]> {
    return db.getAll<Pais>(TABLE_PAIS);
  }

  /**
   * Obtener todos los departamentos por ID de país
   */
  async function getDepartamentosByPais(
    id_pais: number
  ): Promise<Departamento[]> {
    return db.getAll<Departamento>(
      TABLE_DEPARTAMENTO,
      `WHERE id_pais = ${id_pais}`
    );
  }

  /**
   * Obtener todos los municipios por ID de departamento
   */
  async function getMunicipiosByDepartamento(
    id_departamento: number
  ): Promise<Municipio[]> {
    return db.getAll<Municipio>(
      TABLE_MUNICIPIO,
      `WHERE id_departamento = ${id_departamento}`
    );
  }

  /**
   * Crear un nuevo país
   */
  async function addPais(data: Omit<Pais, "id_pais">): Promise<number> {
    return db.insert(TABLE_PAIS, data);
  }

  /**
   * Crear un nuevo departamento
   */
  async function addDepartamento(
    data: Omit<Departamento, "id_departamento">
  ): Promise<number> {
    return db.insert(TABLE_DEPARTAMENTO, data);
  }

  /**
   * Crear un nuevo municipio
   */
  async function addMunicipio(
    data: Omit<Municipio, "id_municipio">
  ): Promise<number> {
    return db.insert(TABLE_MUNICIPIO, data);
  }

  /**
   * Actualizar un país
   */
  async function updatePais(
    id_pais: number,
    data: Partial<Pais>
  ): Promise<void> {
    await db.update(TABLE_PAIS, data, { id_pais });
  }

  /**
   * Actualizar un departamento
   */
  async function updateDepartamento(
    id_departamento: number,
    data: Partial<Departamento>
  ): Promise<void> {
    await db.update(TABLE_DEPARTAMENTO, data, { id_departamento });
  }

  /**
   * Actualizar un municipio
   */
  async function updateMunicipio(
    id_municipio: number,
    data: Partial<Municipio>
  ): Promise<void> {
    await db.update(TABLE_MUNICIPIO, data, { id_municipio });
  }

  /**
   * Eliminar un país (y sus relaciones)
   */
  async function deletePais(id_pais: number): Promise<void> {
    await db.remove(TABLE_PAIS, { id_pais });
  }

  /**
   * Eliminar un departamento (y sus relaciones)
   */
  async function deleteDepartamento(id_departamento: number): Promise<void> {
    await db.remove(TABLE_DEPARTAMENTO, { id_departamento });
  }

  /**
   * Eliminar un municipio
   */
  async function deleteMunicipio(id_municipio: number): Promise<void> {
    await db.remove(TABLE_MUNICIPIO, { id_municipio });
  }

  /**
   * Obtener la dirección completa usando el id_municipio
   */
  async function getDireccionCompleta(id_municipio: number): Promise<any> {
    const municipio = await db.getOne<Municipio>(TABLE_MUNICIPIO, {
      id_municipio,
    });
    if (!municipio) {
      throw new Error("Municipio no encontrado");
    }

    const departamento = await db.getOne<Departamento>(TABLE_DEPARTAMENTO, {
      id_departamento: municipio.id_departamento,
    });
    if (!departamento) {
      throw new Error("Departamento no encontrado");
    }

    const pais = await db.getOne<Pais>(TABLE_PAIS, {
      id_pais: departamento.id_pais,
    });
    if (!pais) {
      throw new Error("País no encontrado");
    }

    return {
      pais: pais.nombre_pais,
      departamento: departamento.nombre_departamento,
      municipio: municipio.nombre_municipio,
    };
  }

  return {
    getAllPaises,
    getDepartamentosByPais,
    getMunicipiosByDepartamento,
    addPais,
    addDepartamento,
    addMunicipio,
    updatePais,
    updateDepartamento,
    updateMunicipio,
    deletePais,
    deleteDepartamento,
    deleteMunicipio,
    getDireccionCompleta,
  };
}
