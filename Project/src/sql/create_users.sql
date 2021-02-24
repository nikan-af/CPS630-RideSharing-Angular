CREATE TABLE `sys`.`users` (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `email` NVARCHAR(255) NULL,
  `password` NVARCHAR(100) NULL,
  `fullName` VARCHAR(100) NULL,
  `createdAt` DATETIME NULL,
  PRIMARY KEY (`userId`));
