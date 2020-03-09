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

CREATE TABLE electronics (
  id INT AUTO_INCREMENT,
  item VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL,
  description VARCHAR(100) NULL,
  sold INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE apparel (
  id INT AUTO_INCREMENT,
  item VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL,
  description VARCHAR(100) NULL,
  sold INT NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO pharmacy (item, price, stock, description, sold)
VALUES ("bandages", 1.50, 100, "Used for small wounds", 0);

INSERT INTO pharmacy (item, price, stock, description, sold)
VALUES ("ibuprofen", 9.00, 40, "Fever and pain reducer", 0);

INSERT INTO pharmacy (item, price, stock, description, sold)
VALUES ("cough drops", 1.00, 100, "Soothing throat losanges", 0);

INSERT INTO grocery (item, price, stock, description, sold)
VALUES ("milk", 3.50, 50, "Fresh, 2% milk", 0);

INSERT INTO grocery (item, price, stock, description, sold)
VALUES ("bread", 1.50, 100, "Baked fresh daily", 0);

INSERT INTO grocery (item, price, stock, description, sold)
VALUES ("eggs", .75, 70, "12-count egg carton", 0);

INSERT INTO electronics (item, price, stock, description, sold)
VALUES ("batteries", 5.00, 50, "Gogofast brand AA", 0);

INSERT INTO electronics (item, price, stock, description, sold)
VALUES ("flashlight", 1.00, 70, "12-count egg carton", 0);

INSERT INTO electronics (item, price, stock, description, sold)
VALUES ("USB cable", 7.50, 20, "Type-C connector", 0);

INSERT INTO apparel (item, price, stock, description, sold)
VALUES ("flip flops", 1.00, 10, "Florida's national footwear", 0);

INSERT INTO apparel (item, price, stock, description, sold)
VALUES ("suit", 200.00, 5, "Proper business attire", 0);

INSERT INTO apparel (item, price, stock, description, sold)
VALUES ("jacket", 25.00, 20, "Warm winter-wear", 0);

SELECT * 
FROM grocery,pharmacy
WHERE grocery.id = pharmacy.id;
SELECT * FROM grocery;
SELECT * FROM electronics;
SELECT * FROM grocery,pharmacy WHERE grocery.id = pharmacy.id;
SELECT * FROM grocery JOIN pharmacy ON grocery.id = pharmacy.id;