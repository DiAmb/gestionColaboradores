-- Crear la base de datos
CREATE DATABASE GestionColaboradores;

-- Usar la base de datos
USE GestionColaboradores;

-- Tabla para almacenar la información de los países
CREATE TABLE Pais (
    id_pais INT AUTO_INCREMENT PRIMARY KEY,
    nombre_pais VARCHAR(100) NOT NULL
);

-- Tabla para almacenar la información de los departamentos
CREATE TABLE Departamento (
    id_departamento INT AUTO_INCREMENT PRIMARY KEY,
    nombre_departamento VARCHAR(100) NOT NULL,
    id_pais INT NOT NULL,
    FOREIGN KEY (id_pais) REFERENCES Pais(id_pais) ON DELETE CASCADE
);

-- Tabla para almacenar la información de los municipios
CREATE TABLE Municipio (
    id_municipio INT AUTO_INCREMENT PRIMARY KEY,
    nombre_municipio VARCHAR(100) NOT NULL,
    id_departamento INT NOT NULL,
    FOREIGN KEY (id_departamento) REFERENCES Departamento(id_departamento) ON DELETE CASCADE
);

-- Tabla para almacenar la información de las empresas
CREATE TABLE Empresa (
    id_empresa INT AUTO_INCREMENT PRIMARY KEY,
    razon_social_empresa VARCHAR(150) NOT NULL,
    nombre_comercial_empresa VARCHAR(150),
    nit_empresa VARCHAR(20) NOT NULL UNIQUE,
    telefono_empresa VARCHAR(15),
    correo_electronico_empresa VARCHAR(100),
    id_municipio INT NOT NULL,
    FOREIGN KEY (id_municipio) REFERENCES Municipio(id_municipio) ON DELETE CASCADE
);

-- Tabla para almacenar la información de los colaboradores
CREATE TABLE Colaborador (
    id_cui_colaborador INT  PRIMARY KEY,
    nombres_colaborador VARCHAR(50) NOT NULL,
    apellidos_colaborador VARCHAR(50) NOT NULL,
    fecha_nacimiento_colaborador DATE NOT NULL,
    telefono_colaborador VARCHAR(15),
    correo_electronico_colaborador VARCHAR(100)
);

-- Tabla intermedia para manejar la relación de muchos a muchos entre colaboradores y empresas
CREATE TABLE ColaboradorEmpresa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_colaborador INT NOT NULL,
    id_empresa INT NOT NULL,
    FOREIGN KEY (id_colaborador) REFERENCES Colaborador(id_cui_colaborador) ON DELETE CASCADE,
    FOREIGN KEY (id_empresa) REFERENCES Empresa(id_empresa) ON DELETE CASCADE
);

-- Tabla para almacenar la información del personal
CREATE TABLE personal (
    id_cui_personal BIGINT PRIMARY KEY,
    nombres_personal VARCHAR(50) NOT NULL,
    apellidos_personal VARCHAR(50) NOT NULL,  
    sexo_personal CHAR(1) NOT NULL,
    fecha_nacimiento_personal DATE NOT NULL,
    telefono_personal VARCHAR(15) NOT NULL,
    estado_personal BOOLEAN DEFAULT 1
);

-- Tabla para la autenticación del personal
CREATE TABLE autenticacion (
    id_autentificaion INT AUTO_INCREMENT PRIMARY KEY,
    id_personal BIGINT NOT NULL,
    correo_autentificacion VARCHAR(100) NOT NULL UNIQUE,
    contrasena_autentificacion VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_personal) REFERENCES personal(id_cui_personal) ON DELETE CASCADE
);
