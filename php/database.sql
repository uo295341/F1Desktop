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
    año INT NOT NULL,
    id_equipo INT NOT NULL,
    id_piloto INT NOT NULL,
    puntos_totales INT NOT NULL,
    FOREIGN KEY (id_equipo) REFERENCES Equipos(id_equipo),
    FOREIGN KEY (id_piloto) REFERENCES Pilotos(id_piloto)
) ENGINE=InnoDB;

