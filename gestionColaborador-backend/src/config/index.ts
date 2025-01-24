import dotenv from "dotenv";

dotenv.config();

interface AppConfig {
  port: number;
}

interface JwtConfig {
  secret: string;
}

interface MySqlConfig {
  host: string;
  user: string;
  password: string;
  database: string;
}

interface Config {
  app: AppConfig;
  jwt: JwtConfig;
  mysql: MySqlConfig;
}

const config: Config = {
  app: {
    port: parseInt(process.env.PORT || "3000", 10),
  },
  jwt: {
    secret: process.env.JWT_SECRET || "NOTA SECRETA",
  },
  mysql: {
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "admin",
    database: process.env.MYSQL_DB || "GestionColaboradores",
  },
};

export default config;
