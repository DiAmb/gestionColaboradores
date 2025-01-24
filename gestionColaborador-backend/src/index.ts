import express from "express";
import config from "./config";
import cors from "cors";
import auth from "./modulos/autentificacion/autentificacion.routes";
import empleados from "./modulos/empleados/empleados.routes";
import colaboradores from "./modulos/colaboradores/colaboradores.routes";
import ubicacion from "./modulos/ubicacion/ubicacion.routes";
import empresas from "./modulos/empresas/empresas.routes";
import morgan from "morgan";
import error from "./red/error";

const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*",
  optionsSuccessStatus: parseInt(
    process.env.CORS_OPTIONS_SUCCESS_STATUS || "200",
    10
  ),
  exposedHeaders: "Content-Disposition",
};

app.use(cors(corsOptions));

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración
app.set("port", config.app.port);

// Rutas
app.use("/api/autenticacion", auth);
app.use("/api/empleados", empleados);
app.use("/api/colaboradores", colaboradores);
app.use("/api/ubicacion", ubicacion);
app.use("/api/empresas", empresas);
app.use(error);

// Asegúrate de que el servidor esté escuchando
app.listen(config.app.port, () => {
  console.log(`Servidor escuchando en el puerto ${config.app.port}`);
});

export default app;
