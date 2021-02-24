CREATE TABLE `cps530`.`discount` (
  `discountId` INT NOT NULL AUTO_INCREMENT,
  `fullname` VARCHAR(255) NULL,
  `schoolName` VARCHAR(255) NULL,
  `email` NVARCHAR(255) NULL,
  `approved` CHAR(1) NULL,
  PRIMARY KEY (`discountId`));
