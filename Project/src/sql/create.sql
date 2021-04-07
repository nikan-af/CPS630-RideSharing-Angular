CREATE TABLE `cps630`.`User` (
  `UserId` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(255) NULL,
  `Tel` VARCHAR(100) NULL,
  `Email` VARCHAR(255) NULL,
  `Address` VARCHAR(255) NULL,
  `CityCode` VARCHAR(10) NULL,
  `Password` VARCHAR(255) NULL,
  `Balance` DECIMAL(6, 2) DEFAULT 0 NULL,
  `isAdmin` BOOLEAN DEFAULT 0 NOT NULL,
  `Salt` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`UserId`)
);

CREATE TABLE `cps630`.`Car` (
  `CarId` INT NOT NULL AUTO_INCREMENT,
  `CarModel` VARCHAR(255) NULL,
  `CarCode` NVARCHAR(100) NULL,
  `AvailabilityCode` NVARCHAR(100) NULL,
  `CarColour` VARCHAR(255) NULL,
  `ImageURL` NVARCHAR(255) NULL,
  `CarPrice` DECIMAL(6, 2) NULL,
  PRIMARY KEY (`CarId`)
);

CREATE TABLE `cps630`.`Payment` (
  `PaymentId` INT NOT NULL AUTO_INCREMENT,
  `OrderId` INT NOT NULL,
  `CardNumber` VARCHAR(255) NULL,
  `CardHolderFirstName` VARCHAR(255) NULL,
  `CardHolderLastName` VARCHAR(255) NULL,
  `ExpiryMonth` VARCHAR(2) NULL,
  `ExpiryYear` VARCHAR(4) NULL,
  `CardAddressLine1` VARCHAR(255) NULL,
  `CardAddressLine2` VARCHAR(255) NULL,
  `PostalCode` VARCHAR(10) NULL,
  `City` VARCHAR(255) NULL,
  `StateOrProvince` VARCHAR(255) NULL,
  `Country` VARCHAR(255) NULL,
  PRIMARY KEY (`PaymentId`)
);

CREATE TABLE `cps630`.`Inquiry` (
  `InquiryId` INT NOT NULL AUTO_INCREMENT,
  `FName` TEXT NOT NULL,
  `LName` TEXT NOT NULL,
  `Email` TEXT NOT NULL,
  `Message` TEXT NOT NULL,
  `TypeOfInquiry` TEXT NOT NULL,
  PRIMARY KEY (`InquiryId`)
) ENGINE = InnoDB;

CREATE TABLE `cps630`.`Flower` (
  `ProductId` INT NOT NULL AUTO_INCREMENT,
  `StoreCode` VARCHAR(6) NOT NULL,
  `Name` VARCHAR(255) NOT NULL,
  `Price` VARCHAR(10) NOT NULL,
  `ImageURL` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`ProductId`)
);

CREATE TABLE `cps630`.`Coffee` (
  `ProductId` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(255) NOT NULL,
  `Price` VARCHAR(10) NOT NULL,
  `ImageURL` VARCHAR(255) NOT NULL,
  `StoreCode` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`ProductId`)
);

CREATE TABLE `cps630`.`Order` (
  `OrderId` INT NOT NULL AUTO_INCREMENT,
  `UserId` INT NOT NULL,
  `OrderTotal` VARCHAR(10) NOT NULL,
  `Timestamp` TIMESTAMP NOT NULL,
  PRIMARY KEY (`OrderId`)
);

CREATE TABLE `cps630`.`Trip` (
  `TripId` INT NOT NULL AUTO_INCREMENT,
  `OrderId` INT NOT NULL,
  `Duration` VARCHAR(255) NOT NULL,
  `Distance` VARCHAR(255) NOT NULL,
  `StartAddress` VARCHAR(255) NOT NULL,
  `EndAddress` VARCHAR(255) NOT NULL,
  `StartLocationLat` VARCHAR(255) NOT NULL,
  `StartLocationLng` VARCHAR(255) NOT NULL,
  `EndLocationLat` VARCHAR(255) NOT NULL,
  `EndLocationLng` VARCHAR(255) NOT NULL,
  `CarId` INT,
  PRIMARY KEY (`TripId`)
);

CREATE TABLE `cps630`.`Inquiry` (
  `InquiryId` INT NOT NULL AUTO_INCREMENT,
  `FName` TEXT NOT NULL,
  `LName` TEXT NOT NULL,
  `Email` TEXT NOT NULL,
  `Message` TEXT NOT NULL,
  `TypeOfInquiry` TEXT NOT NULL,
  PRIMARY KEY (`InquiryId`)
);

CREATE TABLE `cps630`.`Review` (
  `FirstName` VARCHAR(255) NOT NULL,
  `LastName` VARCHAR(255) NOT NULL,
  `Message` VARCHAR(255),
  `Rating` INT NOT NULL,
  `ServiceType` VARCHAR(255),
  `Timestamp` VARCHAR(255) NOT NULL
);