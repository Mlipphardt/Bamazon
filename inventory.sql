DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE grocery (
  id INT AUTO_INCREMENT,
  item VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL,
  description VARCHAR(100) NULL,
  sold INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE pharmacy (
  id INT AUTO_INCREMENT,
  item VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL,
  description VARCHAR(100) NULL,
  sold INT NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO grocery (item, price, stock, description, sold)
VALUES ("milk", 3.50, 50, "Fresh, 2% milk", 0);

INSERT INTO pharmacy (item, price, stock, description, sold)
VALUES ("bandages", 1.50, 100, "Used for small wounds", 0);

SELECT * FROM pharmacy;
SELECT * FROM grocery;