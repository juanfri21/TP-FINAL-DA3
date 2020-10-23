SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

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
  `email` VARCHAR(200) NOT NULL UNIQUE ,
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
  `conectado` INT NOT NULL,
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
  `uuidSensor` VARCHAR(200) NOT NULL UNIQUE,
  `tipo` VARCHAR(50),
  `nombre` VARCHAR(200),
  `ubicacion` VARCHAR(200),
  `conectado` INT NOT NULL,
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
  `uuidSensor` VARCHAR(200) NOT NULL,
  `valor` FLOAT,
  `fecha` DATETIME NOT NULL,
  PRIMARY KEY (`idMetrica`),
    FOREIGN KEY (`uuidSensor`)
    REFERENCES `iot-system`.`Sensores` (`uuidSensor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

INSERT INTO `Usuarios` (`nombre`, `email`, `contraseña`, `fecha_creacion`, `fecha_actualizacion`, `rol`) VALUES ('juan', 'juan@gmail.com', '2222', current_timestamp(), current_timestamp(), 'admin');
INSERT INTO `Dispositivos` (`uuid`, `nombre`, `ubicacion`, `conectado`, `fecha_creacion`, `fecha_actualizacion`, `descripcion`, `idUsuario`) VALUES ('SERIAL_1', 'dispositivo 1', 'patio', 1, current_timestamp(),current_timestamp(), 'nada', 1);
INSERT INTO `Dispositivos` (`uuid`, `nombre`, `ubicacion`, `conectado`, `fecha_creacion`, `fecha_actualizacion`, `descripcion`, `idUsuario`) VALUES ('SERIAL_2', 'dispositivo 2', 'living', 1, current_timestamp(),current_timestamp(), 'nada', 1);


INSERT INTO `Sensores` (`uuidSensor`,`tipo`, `nombre`, `ubicacion`, `conectado`, `fecha_creacion`, `fecha_actualizacion`,`codigo`, `unidad`, `idDispositivo`) VALUES ('SERIAL_1_1','sensor', 'humedad', 'patio', 1,current_timestamp(),current_timestamp(),33, 'C',1);
INSERT INTO `Sensores` (`uuidSensor`,`tipo`, `nombre`, `ubicacion`, `conectado`, `fecha_creacion`, `fecha_actualizacion`,`codigo`, `unidad`, `idDispositivo`) VALUES ('SERIAL_1_2','sensor', 'temperatura', 'patio', 1,current_timestamp(),current_timestamp(),22, 'C',1);
INSERT INTO `Sensores` (`uuidSensor`,`tipo`, `nombre`, `ubicacion`, `conectado`, `fecha_creacion`, `fecha_actualizacion`,`codigo`, `unidad`, `idDispositivo`) VALUES ('SERIAL_1_3','actuador', 'luz 1', 'patio', 1,current_timestamp(),current_timestamp(),13, 'X',1);

INSERT INTO `Sensores` (`uuidSensor`,`tipo`, `nombre`, `ubicacion`, `conectado`, `fecha_creacion`, `fecha_actualizacion`,`codigo`, `unidad`, `idDispositivo`) VALUES ('SERIAL_2_1','sensor', 'humedad', 'living', 1,current_timestamp(),current_timestamp(),33, 'C',2);
INSERT INTO `Sensores` (`uuidSensor`,`tipo`, `nombre`, `ubicacion`, `conectado`, `fecha_creacion`, `fecha_actualizacion`,`codigo`, `unidad`, `idDispositivo`) VALUES ('SERIAL_2_2','sensor', 'temperatura', 'living', 1,current_timestamp(),current_timestamp(),22, 'C',2);
INSERT INTO `Sensores` (`uuidSensor`,`tipo`, `nombre`, `ubicacion`, `conectado`, `fecha_creacion`, `fecha_actualizacion`,`codigo`, `unidad`, `idDispositivo`) VALUES ('SERIAL_2_3','actuador', 'luz 2', 'living', 1,current_timestamp(),current_timestamp(),13, 'X',2);

INSERT INTO `Metricas` (`uuidSensor`,`valor`, `fecha`) VALUES ('SERIAL_1_1', 33, current_timestamp());
INSERT INTO `Metricas` (`uuidSensor`,`valor`, `fecha`) VALUES ('SERIAL_1_1', 34, current_timestamp());
INSERT INTO `Metricas` (`uuidSensor`,`valor`, `fecha`) VALUES ('SERIAL_1_1', 55, current_timestamp());
INSERT INTO `Metricas` (`uuidSensor`,`valor`, `fecha`) VALUES ('SERIAL_1_2', 33, current_timestamp());
INSERT INTO `Metricas` (`uuidSensor`,`valor`, `fecha`) VALUES ('SERIAL_1_2', 34, current_timestamp());
INSERT INTO `Metricas` (`uuidSensor`,`valor`, `fecha`) VALUES ('SERIAL_1_2', 0, current_timestamp() );
INSERT INTO `Metricas` (`uuidSensor`,`valor`, `fecha`) VALUES ('SERIAL_1_3', 1, current_timestamp() );
INSERT INTO `Metricas` (`uuidSensor`,`valor`, `fecha`) VALUES ('SERIAL_1_3', 0, current_timestamp() );
INSERT INTO `Metricas` (`uuidSensor`,`valor`, `fecha`) VALUES ('SERIAL_1_3', 1, current_timestamp() );
INSERT INTO `Metricas` (`uuidSensor`,`valor`, `fecha`) VALUES ('SERIAL_2_1', 33, current_timestamp());
INSERT INTO `Metricas` (`uuidSensor`,`valor`, `fecha`) VALUES ('SERIAL_2_1', 34, current_timestamp());
INSERT INTO `Metricas` (`uuidSensor`,`valor`, `fecha`) VALUES ('SERIAL_2_1', 45, current_timestamp());
INSERT INTO `Metricas` (`uuidSensor`,`valor`, `fecha`) VALUES ('SERIAL_2_2', 33, current_timestamp());
INSERT INTO `Metricas` (`uuidSensor`,`valor`, `fecha`) VALUES ('SERIAL_2_2', 34, current_timestamp());
INSERT INTO `Metricas` (`uuidSensor`,`valor`, `fecha`) VALUES ('SERIAL_2_2', 65, current_timestamp());
INSERT INTO `Metricas` (`uuidSensor`,`valor`, `fecha`) VALUES ('SERIAL_2_3', 1, current_timestamp() );
INSERT INTO `Metricas` (`uuidSensor`,`valor`, `fecha`) VALUES ('SERIAL_2_3', 0, current_timestamp() );
INSERT INTO `Metricas` (`uuidSensor`,`valor`, `fecha`) VALUES ('SERIAL_2_3', 1, current_timestamp() );

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;