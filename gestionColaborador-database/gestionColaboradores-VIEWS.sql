CREATE VIEW VistaColaboradoresEmpresas AS
SELECT 
    c.id_cui_colaborador,
    c.nombres_colaborador,
    c.apellidos_colaborador,
    c.fecha_nacimiento_colaborador,
    c.telefono_colaborador,
    c.correo_electronico_colaborador,
    e.id_empresa,
    e.nombre_comercial_empresa
FROM 
    Colaborador c
LEFT JOIN 
    ColaboradorEmpresa ce ON c.id_cui_colaborador = ce.id_colaborador
LEFT JOIN 
    Empresa e ON ce.id_empresa = e.id_empresa;

