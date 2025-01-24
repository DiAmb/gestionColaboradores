import {
  createPool,
  Pool,
  RowDataPacket,
  ResultSetHeader,
} from "mysql2/promise";
import config from "../config";

// Configuración de conexión
const dbconfig = {
  connectionLimit: 10,
  host: config.mysql.host,
  user: config.mysql.user,
  database: config.mysql.database,
  password: config.mysql.password,
  waitForConnections: true,
};

const pool: Pool = createPool(dbconfig);

// Manejo de eventos en el pool
pool.on("enqueue", () => {
  console.warn("Esperando una conexión disponible en el pool.");
});

// Función para ejecutar consultas genéricas
async function executeQuery<T extends RowDataPacket[] | ResultSetHeader>(
  sql: string,
  values: any[] = []
): Promise<T> {
  try {
    const [result] = await pool.query<T>(sql, values);
    return result;
  } catch (error) {
    console.error("Error al ejecutar la consulta:", error);
    throw error;
  }
}

// Función para obtener todos los registros de una tabla
async function getAll<T>(table: string, filters: string = ""): Promise<T[]> {
  const sql = `SELECT * FROM ${table} ${filters}`;
  return (await executeQuery<RowDataPacket[]>(sql)) as T[];
}

// Función para insertar múltiples registros
async function insertMultiple<T>(table: string, data: T[]): Promise<number> {
  if (data.length === 0) {
    throw new Error("El array de datos está vacío.");
  }
  const keys = Object.keys(data[0] as object);
  const placeholders = data
    .map(() => `(${keys.map(() => "?").join(",")})`)
    .join(",");
  const values = data.flatMap((item) => keys.map((key) => (item as any)[key]));

  const sql = `INSERT INTO ${table} (${keys.join(",")}) VALUES ${placeholders}`;
  const result = (await executeQuery<ResultSetHeader>(
    sql,
    values
  )) as ResultSetHeader;
  return result.affectedRows;
}

// Función para obtener un registro específico
async function getOne<T>(table: string, criteria: object): Promise<T | null> {
  const sql = `SELECT * FROM ${table} WHERE ?`;
  const rows = (await executeQuery<RowDataPacket[]>(sql, [criteria])) as T[];
  if (rows.length > 1) {
    throw new Error("Se encontraron múltiples resultados.");
  }
  return rows[0] || null;
}

// Función para insertar un registro
async function insert<T>(table: string, data: T): Promise<number> {
  const sql = `INSERT INTO ${table} SET ?`;
  const result = (await executeQuery<ResultSetHeader>(sql, [
    data,
  ])) as ResultSetHeader;
  return result.insertId;
}

// Función para actualizar registros
async function update<T>(
  table: string,
  data: Partial<T>,
  criteria: object
): Promise<void> {
  const sql = `UPDATE ${table} SET ? WHERE ?`;
  await executeQuery<ResultSetHeader>(sql, [data, criteria]);
}

// Función para eliminar registros
async function remove(table: string, criteria: object): Promise<void> {
  const sql = `DELETE FROM ${table} WHERE ?`;
  const result = (await executeQuery<ResultSetHeader>(sql, [
    criteria,
  ])) as ResultSetHeader;
  if (result.affectedRows === 0) {
    throw new Error("No se encontró ningún registro para eliminar.");
  }
}

// Exportar funciones
export default {
  getAll,
  getOne,
  insert,
  update,
  remove,
  insertMultiple,
};
