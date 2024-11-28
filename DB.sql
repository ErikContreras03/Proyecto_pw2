-- Si existe la base de datos 'libreria', la elimina
DROP SCHEMA IF EXISTS `libreria`;

-- Crea la base de datos de la librería
CREATE SCHEMA IF NOT EXISTS `libreria` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `libreria`;

-- Crea la tabla de libros
CREATE TABLE `libros` (
    `id` INT(11) NOT NULL AUTO_INCREMENT, -- Llave primaria
    `fecha_adquisicion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Fecha en que el libro fue adquirido
    `fecha_regreso` DATETIME NOT NULL, -- Fecha de regreso del libro
    `titulo` VARCHAR(255) NOT NULL, -- Título del libro
    `autor` VARCHAR(255) NOT NULL, -- Autor del libro
    `editorial` VARCHAR(255) NOT NULL, -- Editorial del libro
    `genero` VARCHAR(100) NOT NULL, -- Género literario
    `stock` INT(11) NOT NULL, -- Cantidad en inventario
    `edicion` VARCHAR(50) NOT NULL, -- Edición del libro
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Inserción de registros de ejemplo
INSERT INTO `libros` (`fecha_regreso`, `titulo`, `autor`, `editorial`, `genero`, `stock`, `edicion`)
VALUES
('2024-12-15 10:00:00', 'El Principito', 'Antoine de Saint-Exupéry', 'Reynal & Hitchcock', 'Literatura Infantil', 15, '5ª Edición');


