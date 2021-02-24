CREATE TABLE `cps530`.`products` (
  `productId` INT NOT NULL AUTO_INCREMENT,
  `productName` VARCHAR(255) NULL,
  `gender` VARCHAR(1) NULL,
  `description` NVARCHAR(255) NULL,
  `imageURL` NVARCHAR(255) NULL,
  `price` DECIMAL(6,2) NULL
  PRIMARY KEY (`productId`));
