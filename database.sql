-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS F1_Desktop;

-- Usar la base de datos recién creada
USE F1_Desktop;

-- Crear tabla Equipos con InnoDB
CREATE TABLE IF NOT EXISTS Equipos (
    id_equipo INT AUTO_INCREMENT PRIMARY KEY,
    equipo_nombre VARCHAR(255) NOT NULL UNIQUE,
    pais VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

-- Crear tabla Pilotos con InnoDB
CREATE TABLE IF NOT EXISTS Pilotos (
    id_piloto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    nacionalidad VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    equipo_nombre VARCHAR(255),
    FOREIGN KEY (equipo_nombre) REFERENCES Equipos(equipo_nombre) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Crear tabla Carreras con InnoDB
CREATE TABLE IF NOT EXISTS Carreras (
    id_carrera INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    fecha DATE NOT NULL,
    ubicacion VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

-- Crear tabla Resultados con InnoDB
CREATE TABLE IF NOT EXISTS Resultados (
    id_resultado INT AUTO_INCREMENT PRIMARY KEY,
    id_piloto INT NOT NULL,
    id_carrera INT NOT NULL,
    posicion INT NOT NULL,
    puntos INT NOT NULL,
    FOREIGN KEY (id_piloto) REFERENCES Pilotos(id_piloto),
    FOREIGN KEY (id_carrera) REFERENCES Carreras(id_carrera)
) ENGINE=InnoDB;

-- Crear tabla Temporada con InnoDB
CREATE TABLE IF NOT EXISTS Temporada (
    id_temporada INT AUTO_INCREMENT PRIMARY KEY,
    anio INT NOT NULL,
    id_equipo INT NOT NULL,
    id_piloto INT NOT NULL,
    puntos_totales INT NOT NULL,
    FOREIGN KEY (id_equipo) REFERENCES Equipos(id_equipo),
    FOREIGN KEY (id_piloto) REFERENCES Pilotos(id_piloto)
) ENGINE=InnoDB;

-- Insertar datos iniciales en Equipos
INSERT INTO Equipos (equipo_nombre, pais) VALUES
('Mercedes', 'Reino Unido'),
('Red Bull Racing', 'Países Bajos'),
('Ferrari', 'Italia'),
('Aston Martin', 'Reino Unido'),
('Alfa Romeo', 'Suiza');

-- Insertar datos iniciales en Pilotos
INSERT INTO Pilotos (nombre, nacionalidad, fecha_nacimiento, equipo_nombre) VALUES
('Lewis Hamilton', 'Reino Unido', '1985-01-07', 'Mercedes'),
('Max Verstappen', 'Países Bajos', '1997-09-30', 'Mercedes'),
('Charles Leclerc', 'Mónaco', '1997-10-16', 'Mercedes'),
('Fernando Alonso', 'España', '1981-07-29', 'Mercedes'),
('Sergio Pérez', 'México', '1990-01-26', 'Mercedes');

-- Insertar datos iniciales en Carreras
INSERT INTO Carreras (nombre, fecha, ubicacion) VALUES
('Gran Premio de Australia', '2024-03-17', 'Melbourne'),
('Gran Premio de Mónaco', '2024-05-26', 'Mónaco'),
('Gran Premio de España', '2024-06-23', 'Barcelona'),
('Gran Premio de México', '2024-10-27', 'Ciudad de México'),
('Gran Premio de Abu Dhabi', '2024-12-01', 'Yas Marina');

-- Insertar datos iniciales en Resultados
INSERT INTO Resultados (id_piloto, id_carrera, posicion, puntos) VALUES
(1, 1, 1, 25), -- Lewis Hamilton en Australia
(2, 1, 2, 18), -- Max Verstappen en Australia
(3, 1, 3, 15), -- Charles Leclerc en Australia
(4, 2, 1, 25), -- Fernando Alonso en Mónaco
(5, 2, 2, 18); -- Sergio Pérez en Mónaco

-- Insertar datos iniciales en Temporada
INSERT INTO Temporada (anio, id_equipo, id_piloto, puntos_totales) VALUES
(2024, 1, 1, 275),  -- Mercedes y Lewis Hamilton
(2024, 2, 2, 300),  -- Red Bull Racing y Max Verstappen
(2024, 3, 3, 150),  -- Ferrari y Charles Leclerc
(2024, 4, 4, 100),  -- Aston Martin y Fernando Alonso
(2024, 5, 5, 80);   -- Alfa Romeo y Sergio Pérez
