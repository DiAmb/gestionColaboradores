-- Usar la base de datos
USE GestionColaboradores;

-- Insertar países
INSERT INTO Pais (nombre_pais) VALUES
('Guatemala'),
('El Salvador'),
('Perú');

-- Insertar departamentos para Guatemala
INSERT INTO Departamento (nombre_departamento, id_pais) VALUES
('Guatemala', 1),
('Sacatepéquez', 1),
('Escuintla', 1),
('Quetzaltenango', 1),
('Petén', 1),
('Chimaltenango', 1),
('Alta Verapaz', 1),
('Baja Verapaz', 1),
('Huehuetenango', 1),
('Izabal', 1);

-- Insertar departamentos para El Salvador
INSERT INTO Departamento (nombre_departamento, id_pais) VALUES
('San Salvador', 2),
('La Libertad', 2),
('Santa Ana', 2),
('San Miguel', 2),
('Usulután', 2),
('Chalatenango', 2),
('La Unión', 2),
('Ahuachapán', 2),
('Sonsonate', 2),
('Morazán', 2);

-- Insertar departamentos para Perú
INSERT INTO Departamento (nombre_departamento, id_pais) VALUES
('Lima', 3),
('Cusco', 3),
('Arequipa', 3),
('Piura', 3),
('Loreto', 3),
('La Libertad', 3),
('Puno', 3),
('Junín', 3),
('Ancash', 3),
('Ica', 3);

-- Insertar municipios para Guatemala
INSERT INTO Municipio (nombre_municipio, id_departamento) VALUES
('Ciudad de Guatemala', 1),
('Mixco', 1),
('Antigua Guatemala', 2),
('Ciudad Vieja', 2),
('Escuintla', 3),
('Puerto San José', 3),
('Quetzaltenango', 4),
('Salcajá', 4),
('Flores', 5),
('San Benito', 5);

-- Insertar municipios para El Salvador
INSERT INTO Municipio (nombre_municipio, id_departamento) VALUES
('San Salvador', 11),
('Soyapango', 11),
('Santa Tecla', 12),
('Colón', 12),
('Santa Ana', 13),
('Metapán', 13),
('San Miguel', 14),
('Quelepa', 14),
('Usulután', 15),
('Puerto El Triunfo', 15);

-- Insertar municipios para Perú
INSERT INTO Municipio (nombre_municipio, id_departamento) VALUES
('Lima', 21),
('Miraflores', 21),
('Cusco', 22),
('Machu Picchu', 22),
('Arequipa', 23),
('Yanahuara', 23),
('Piura', 24),
('Sullana', 24),
('Iquitos', 25),
('Nauta', 25);

-- Insertar empresas
INSERT INTO Empresa (razon_social_empresa, nombre_comercial_empresa, nit_empresa, telefono_empresa, correo_electronico_empresa, id_municipio) VALUES
('Empresa A S.A.', 'Comercial A', '1234567891', '50212345678', 'contacto@empresaA.com', 1),
('Empresa B S.A.', 'Comercial B', '1234567892', '50287654321', 'contacto@empresaB.com', 2),
('Empresa C S.A.', 'Comercial C', '1234567893', '50213579246', 'contacto@empresaC.com', 3),
('Empresa D S.A.', 'Comercial D', '1234567894', '50224681357', 'contacto@empresaD.com', 4),
('Empresa E S.A.', 'Comercial E', '1234567895', '50235792468', 'contacto@empresaE.com', 5),
('Empresa F S.A.', 'Comercial F', '1234567896', '50246813579', 'contacto@empresaF.com', 6),
('Empresa G S.A.', 'Comercial G', '1234567897', '50257924680', 'contacto@empresaG.com', 7),
('Empresa H S.A.', 'Comercial H', '1234567898', '50268035791', 'contacto@empresaH.com', 8),
('Empresa I S.A.', 'Comercial I', '1234567899', '50279146802', 'contacto@empresaI.com', 9),
('Empresa J S.A.', 'Comercial J', '1234567800', '50280257913', 'contacto@empresaJ.com', 10);

-- Insertar colaboradores
INSERT INTO Colaborador (id_cui_colaborador, nombres_colaborador, apellidos_colaborador, fecha_nacimiento_colaborador, telefono_colaborador, correo_electronico_colaborador) VALUES
(1001, 'Juan', 'Pérez', '1990-01-15', '50212345601', 'juan.perez@mail.com'),
(1002, 'María', 'González', '1985-06-20', '50212345602', 'maria.gonzalez@mail.com'),
(1003, 'Carlos', 'Ramírez', '1992-08-10', '50212345603', 'carlos.ramirez@mail.com'),
(1004, 'Ana', 'López', '1988-12-05', '50212345604', 'ana.lopez@mail.com'),
(1005, 'Pedro', 'Martínez', '1995-03-25', '50212345605', 'pedro.martinez@mail.com'),
(1006, 'Laura', 'Hernández', '1993-11-15', '50212345606', 'laura.hernandez@mail.com'),
(1007, 'Luis', 'Castro', '1990-07-01', '50212345607', 'luis.castro@mail.com'),
(1008, 'Sofía', 'Morales', '1991-04-10', '50212345608', 'sofia.morales@mail.com'),
(1009, 'Diego', 'Fernández', '1987-09-30', '50212345609', 'diego.fernandez@mail.com'),
(1010, 'Camila', 'Rodríguez', '1994-02-20', '50212345610', 'camila.rodriguez@mail.com'),
(1011, 'Jorge', 'Díaz', '1989-05-05', '50212345611', 'jorge.diaz@mail.com'),
(1012, 'Valeria', 'Ortiz', '1992-10-10', '50212345612', 'valeria.ortiz@mail.com'),
(1013, 'Ricardo', 'Santos', '1991-03-14', '50212345613', 'ricardo.santos@mail.com'),
(1014, 'Gabriela', 'Jiménez', '1988-06-18', '50212345614', 'gabriela.jimenez@mail.com'),
(1015, 'Fernando', 'Ruiz', '1995-12-30', '50212345615', 'fernando.ruiz@mail.com'),
(1016, 'Elena', 'Mendoza', '1987-11-01', '50212345616', 'elena.mendoza@mail.com'),
(1017, 'Manuel', 'Vásquez', '1993-01-12', '50212345617', 'manuel.vasquez@mail.com'),
(1018, 'Isabel', 'Cruz', '1989-04-17', '50212345618', 'isabel.cruz@mail.com'),
(1019, 'David', 'Chávez', '1992-07-09', '50212345619', 'david.chavez@mail.com'),
(1020, 'Andrea', 'Flores', '1990-10-25', '50212345620', 'andrea.flores@mail.com'),
(1021, 'Alejandro', 'Molina', '1985-08-18', '50212345621', 'alejandro.molina@mail.com'),
(1022, 'Patricia', 'Álvarez', '1986-09-28', '50212345622', 'patricia.alvarez@mail.com'),
(1023, 'Sebastián', 'Vega', '1987-12-12', '50212345623', 'sebastian.vega@mail.com'),
(1024, 'Julia', 'Guerrero', '1994-11-30', '50212345624', 'julia.guerrero@mail.com'),
(1025, 'Adrián', 'Navarro', '1993-05-07', '50212345625', 'adrian.navarro@mail.com'),
(1026, 'Mónica', 'Ríos', '1990-06-22', '50212345626', 'monica.rios@mail.com'),
(1027, 'Héctor', 'Campos', '1989-03-11', '50212345627', 'hector.campos@mail.com'),
(1028, 'Carolina', 'Reyes', '1988-10-15', '50212345628', 'carolina.reyes@mail.com'),
(1029, 'Lucas', 'Peralta', '1992-01-01', '50212345629', 'lucas.peralta@mail.com'),
(1030, 'Sara', 'Torres', '1991-09-20', '50212345630', 'sara.torres@mail.com');

-- Asignar colaboradores a las empresas
INSERT INTO ColaboradorEmpresa (id_colaborador, id_empresa) VALUES
(1001, 1), (1002, 1), (1003, 1),
(1004, 2), (1005, 2), (1006, 2),
(1007, 3), (1008, 3), (1009, 3),
(1010, 4), (1011, 4), (1012, 4),
(1013, 5), (1014, 5), (1015, 5),
(1016, 6), (1017, 6), (1018, 6),
(1019, 7), (1020, 7), (1021, 7),
(1022, 8), (1023, 8), (1024, 8),
(1025, 9), (1026, 9), (1027, 9),
(1028, 10), (1029, 10), (1030, 10);


