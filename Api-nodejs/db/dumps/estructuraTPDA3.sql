SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema DA3
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema DA3
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `DA3` DEFAULT CHARACTER SET utf8 ;
USE `DA3` ;

DROP TABLE IF EXISTS `DA3`.`Electrovalvulas` ;
DROP TABLE IF EXISTS `DA3`.`Dispositivos` ;
DROP TABLE IF EXISTS `DA3`.`Mediciones` ;
DROP TABLE IF EXISTS `DA3`.`Log_Riegos` ;

-- -----------------------------------------------------
-- Table `DA3`.`Electrovalvulas`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `DA3`.`Electrovalvulas` (
  `electrovalvulaId` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  PRIMARY KEY (`electrovalvulaId`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `DA3`.`Dispositivos`
-- -----------------------------------------------------
-- //TODO: agregar timezone en la tabla de dispositivos

CREATE TABLE IF NOT EXISTS `DA3`.`Dispositivos` (
  `dispositivoId` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(200) NULL,
  `uuid` VARCHAR(200) NOT NULL UNIQUE,
  `ubicacion` VARCHAR(200) NULL,
  `conectado` BOOLEAN NOT NULL,
  `fecha_creacion` DATETIME NOT NULL,
  `fecha_actualizacion` DATETIME NOT NULL,
  `electrovalvulaId` INT NOT NULL,
  PRIMARY KEY (`dispositivoId`, `electrovalvulaId`),
  INDEX `fk_Dispositivos_Electrovalvulas1_idx` (`electrovalvulaId` ASC) ,
  CONSTRAINT `fk_Dispositivos_Electrovalvulas1`
    FOREIGN KEY (`electrovalvulaId`)
    REFERENCES `DA3`.`Electrovalvulas` (`electrovalvulaId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DA3`.`Mediciones`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `DA3`.`Mediciones` (
  `medicionId` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATETIME NULL,
  `humedad` FLOAT NULL,
  `temperatura` FLOAT NULL,
  `uuid` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`medicionId`, `uuid`),
  INDEX `fk_Mediciones_Dispositivos_idx` (`uuid` ASC) ,
  CONSTRAINT `fk_Mediciones_Dispositivos`
    FOREIGN KEY (`uuid`)
    REFERENCES `DA3`.`Dispositivos` (`uuid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DA3`.`Log_Riegos`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `DA3`.`Log_Riegos` (
  `logRiegoId` INT NOT NULL AUTO_INCREMENT,
  `apertura` TINYINT NULL,
  `fecha` DATETIME NULL,
  `electrovalvulaId` INT NOT NULL,
  PRIMARY KEY (`logRiegoId`, `electrovalvulaId`),
  INDEX `fk_Log_Riegos_Electrovalvulas1_idx` (`electrovalvulaId` ASC) ,
  CONSTRAINT `fk_Log_Riegos_Electrovalvulas1`
    FOREIGN KEY (`electrovalvulaId`)
    REFERENCES `DA3`.`Electrovalvulas` (`electrovalvulaId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- INSERT INTO DA3.Electrovalvulas (nombre) VALUES ('Patio');
-- INSERT INTO DA3.Dispositivos (nombre,uuid,ubicacion,conectado,fecha_creacion,fecha_actualizacion,electrovalvulaId) VALUES ('Sensor 1','sensor_1', 'Patio',true,current_timestamp(),current_timestamp(),1);

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;