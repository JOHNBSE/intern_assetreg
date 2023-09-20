-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`department`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`department` (
  `departmentID` VARCHAR(45) NOT NULL,
  `department_name` VARCHAR(45) NULL,
  PRIMARY KEY (`departmentID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`location`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`location` (
  `locationID` VARCHAR(45) NOT NULL,
  `location_name` VARCHAR(45) NULL,
  `room_no` VARCHAR(45) NULL,
  `departmentID` VARCHAR(45) NULL,
  PRIMARY KEY (`locationID`),
  INDEX `departmentID_idx` (`departmentID` ASC),
  CONSTRAINT `departmentID`
    FOREIGN KEY (`departmentID`)
    REFERENCES `mydb`.`department` (`departmentID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`asset_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`asset_category` (
  `categoryID` VARCHAR(200) NOT NULL,
  `category_name` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  PRIMARY KEY (`categoryID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`asset_information`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`asset_information` (
  `assetID` VARCHAR(45) NOT NULL,
  `serial_no` VARCHAR(45) NULL,
  `locationID` VARCHAR(45) NULL,
  `Condition` VARCHAR(200) NULL,
  `model` VARCHAR(45) NULL,
  `categoryID` VARCHAR(200) NULL,
  PRIMARY KEY (`assetID`),
  INDEX `locationID_idx` (`locationID` ASC),
  INDEX `categoryID_idx` (`categoryID` ASC),
  CONSTRAINT `locationID`
    FOREIGN KEY (`locationID`)
    REFERENCES `mydb`.`location` (`locationID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `categoryID`
    FOREIGN KEY (`categoryID`)
    REFERENCES `mydb`.`asset_category` (`categoryID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`user_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`user_type` (
  `typeID` VARCHAR(45) NOT NULL,
  `account_type` VARCHAR(45) NULL,
  PRIMARY KEY (`typeID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`users` (
  `email` VARCHAR(200) NULL,
  `name` VARCHAR(200) NULL,
  `department` VARCHAR(45) NULL,
  `lab` VARCHAR(45) NULL,
  `type_id` VARCHAR(45) NULL,
  `userID` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NULL,
  PRIMARY KEY (`userID`),
  INDEX `account_type_idx` (`type_id` ASC),
  CONSTRAINT `account_type`
    FOREIGN KEY (`type_id`)
    REFERENCES `mydb`.`user_type` (`typeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`requests`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`requests` (
  `requestID` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL,
  `service_required` VARCHAR(200) NULL,
  `userID` VARCHAR(45) NULL,
  `status` VARCHAR(45) NULL,
  `timeout` DATETIME NULL,
  PRIMARY KEY (`requestID`),
  INDEX `user_id_idx` (`userID` ASC),
  CONSTRAINT `userID`
    FOREIGN KEY (`userID`)
    REFERENCES `mydb`.`users` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`maintenance`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`maintenance` (
  `maintenanceID` VARCHAR(45) NOT NULL,
  `assetID` VARCHAR(45) NULL,
  `maintenance_date` DATE NULL,
  `description` VARCHAR(200) NULL,
  PRIMARY KEY (`maintenanceID`),
  INDEX `assetID_idx` (`assetID` ASC),
  CONSTRAINT `asset_ID`
    FOREIGN KEY (`assetID`)
    REFERENCES `mydb`.`asset_information` (`assetID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`issues`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`issues` (
  `issueID` VARCHAR(45) NOT NULL,
  `description` VARCHAR(200) NULL,
  `report_date` DATETIME NULL,
  `status` VARCHAR(45) NULL,
  `maintenanceID` VARCHAR(45) NULL,
  PRIMARY KEY (`issueID`),
  INDEX `maintenanceID_idx` (`maintenanceID` ASC),
  CONSTRAINT `maintenanceID`
    FOREIGN KEY (`maintenanceID`)
    REFERENCES `mydb`.`maintenance` (`maintenanceID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`consumables`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`consumables` (
  `consumableID` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NULL,
  `categoryID` VARCHAR(45) NULL,
  `quantity` INT NULL,
  `purchase_date` DATE NULL,
  PRIMARY KEY (`consumableID`),
  INDEX `categoryID_idx` (`categoryID` ASC),
  CONSTRAINT `category_id`
    FOREIGN KEY (`categoryID`)
    REFERENCES `mydb`.`asset_category` (`categoryID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
