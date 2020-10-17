SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema iot-system
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema iot-system
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `iot-system` DEFAULT CHARACTER SET utf8 ;
USE `iot-system` ;

DROP TABLE IF EXISTS `iot-system`.`Usuarios` ;
DROP TABLE IF EXISTS `iot-system`.`Dispositivos` ;
DROP TABLE IF EXISTS `iot-system`.`Sensores` ;
DROP TABLE IF EXISTS `iot-system`.`Metricas` ;

-- -----------------------------------------------------
-- Tabla `iot-system`.`Usuarios`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `iot-system`.`Usuarios` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT ,
  `nombre` VARCHAR(200) NOT NULL ,
  `email` VARCHAR(200) NOT NULL ,
  `contraseña` TEXT NOT NULL ,
  `fecha_creacion` DATETIME NOT NULL ,
  `fecha_actualizacion` DATETIME NOT NULL ,
  `rol` VARCHAR(100) NOT NULL ,
  PRIMARY KEY (`idUsuario`)) 
  ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `iot-system`.`Dispositivos`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `iot-system`.`Dispositivos` (
  `idDispositivo` INT NOT NULL AUTO_INCREMENT,
  `uuid` VARCHAR(200) NOT NULL UNIQUE,
  `nombre` VARCHAR(200),
  `ubicacion` VARCHAR(200),
  `conectado` BOOLEAN NOT NULL,
  `fecha_creacion` DATETIME NOT NULL,
  `fecha_actualizacion` DATETIME NOT NULL,
  `descripcion` TEXT ,
  `idUsuario` INT NOT NULL,
  PRIMARY KEY (`idDispositivo`),
    FOREIGN KEY (`idUsuario`)
    REFERENCES `iot-system`.`Usuarios` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `iot-system`.`Sensores`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `iot-system`.`Sensores` (
  `idSensor` INT NOT NULL AUTO_INCREMENT,
  `tipo` VARCHAR(50),
  `nombre` VARCHAR(200),
  `ubicacion` VARCHAR(200),
  `conectado` BOOLEAN NOT NULL,
  `fecha_creacion` DATETIME NOT NULL,
  `fecha_actualizacion` DATETIME NOT NULL,
  `codigo` INT NOT NULL,
  `unidad` VARCHAR(50) NOT NULL,
  `descripcion` TEXT ,
  `idDispositivo` INT NOT NULL,
  PRIMARY KEY (`idSensor`),
    FOREIGN KEY (`idDispositivo`)
    REFERENCES `iot-system`.`Dispositivos` (`idDispositivo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `iot-system`.`Metricas`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `iot-system`.`Metricas` (
  `idMetrica` INT NOT NULL AUTO_INCREMENT,
  `valor` FLOAT,
  `fecha` DATETIME NOT NULL,
  `idSensor` INT NOT NULL,
  PRIMARY KEY (`idMetrica`),
    FOREIGN KEY (`idSensor`)
    REFERENCES `iot-system`.`Sensores` (`idSensor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- INSERT INTO iot-system.Electrovalvulas (nombre) VALUES ('Patio');
-- INSERT INTO iot-system.Dispositivos (nombre,uuid,ubicacion,conectado,fecha_creacion,fecha_actualizacion,electrovalvulaId) VALUES ('Sensor 1','sensor_1', 'Patio',true,current_timestamp(),current_timestamp(),1);

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;