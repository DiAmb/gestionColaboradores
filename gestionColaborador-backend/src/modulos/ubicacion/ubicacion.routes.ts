import express from "express";
import controller from "./ubicacion.controller"; // Ajusta la ruta si es necesario

const router = express.Router();

// Obtener todos los países
router.get("/paises", async (req, res) => {
  try {
    const paises = await controller().getAllPaises();
    res.status(200).json(paises);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los países" });
  }
});

// Obtener todos los departamentos por ID de país
router.get("/departamentos/:id_pais", async (req, res) => {
  const { id_pais } = req.params;
  try {
    const departamentos = await controller().getDepartamentosByPais(
      Number(id_pais)
    );
    res.status(200).json(departamentos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los departamentos" });
  }
});

// Obtener todos los municipios por ID de departamento
router.get("/municipios/:id_departamento", async (req, res) => {
  const { id_departamento } = req.params;
  try {
    const municipios = await controller().getMunicipiosByDepartamento(
      Number(id_departamento)
    );
    res.status(200).json(municipios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los municipios" });
  }
});

// Crear un nuevo país
router.post("/paises", async (req, res) => {
  try {
    const id = await controller().addPais(req.body);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el país" });
  }
});

// Crear un nuevo departamento
router.post("/departamentos", async (req, res) => {
  try {
    const id = await controller().addDepartamento(req.body);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el departamento" });
  }
});

// Crear un nuevo municipio
router.post("/municipios", async (req, res) => {
  try {
    const id = await controller().addMunicipio(req.body);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el municipio" });
  }
});

// Actualizar un país
router.put("/paises/:id_pais", async (req, res) => {
  const { id_pais } = req.params;
  try {
    await controller().updatePais(Number(id_pais), req.body);
    res.status(200).json({ message: "País actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el país" });
  }
});

// Actualizar un departamento
router.put("/departamentos/:id_departamento", async (req, res) => {
  const { id_departamento } = req.params;
  try {
    await controller().updateDepartamento(Number(id_departamento), req.body);
    res.status(200).json({ message: "Departamento actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el departamento" });
  }
});

// Actualizar un municipio
router.put("/municipios/:id_municipio", async (req, res) => {
  const { id_municipio } = req.params;
  try {
    await controller().updateMunicipio(Number(id_municipio), req.body);
    res.status(200).json({ message: "Municipio actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el municipio" });
  }
});

// Eliminar un país
router.delete("/paises/:id_pais", async (req, res) => {
  const { id_pais } = req.params;
  try {
    await controller().deletePais(Number(id_pais));
    res.status(200).json({ message: "País eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el país" });
  }
});

// Eliminar un departamento
router.delete("/departamentos/:id_departamento", async (req, res) => {
  const { id_departamento } = req.params;
  try {
    await controller().deleteDepartamento(Number(id_departamento));
    res.status(200).json({ message: "Departamento eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el departamento" });
  }
});

// Eliminar un municipio
router.delete("/municipios/:id_municipio", async (req, res) => {
  const { id_municipio } = req.params;
  try {
    await controller().deleteMunicipio(Number(id_municipio));
    res.status(200).json({ message: "Municipio eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el municipio" });
  }
});

router.get("/completa/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await controller().getDireccionCompleta(Number(id));
    if (data) {
      res.status(200).json(data);
    } else {
      res
        .status(404)
        .json({ error: "No se encontraron datos para el ID proporcionado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los datos completos" });
  }
});

export default router;
