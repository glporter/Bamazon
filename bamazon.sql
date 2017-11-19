DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE ProductsTable (
  item_id INT NOT NULL auto_increment,
  product_name VARCHAR(300) NULL,
  department_name VARCHAR (100) NULL,
  price DEC(10, 4),
  stock_quantity INT,
  product_sales INT,
  department_id INT,
  PRIMARY KEY (item_id)
);


CREATE TABLE DepartmentsTable (
  department_id INT NOT NULL auto_increment,
  department_name VARCHAR(100) NULL,
  PRIMARY KEY (department_id)
  );
  
 
 CREATE TABLE Products_by_Department (
	id INT NOT NULL auto_increment,
    item_id INT,
    department_id int,
    PRIMARY KEY (id)
);

INSERT INTO ProductsTable (product_name, department_name, price, stock_quantity)
VALUES ("Dell Laptop i5", "Electronics", 500.00, 100);

INSERT INTO ProductsTable (product_name, department_name, price, stock_quantity)
VALUES ("Echo", "Electronics", 99.00, 200);

INSERT INTO ProductsTable (product_name, department_name, price, stock_quantity)
VALUES ("Calphalon Classic Stainless Steel Cookware Set, 10-Piece", "Home", 148.00, 50);

INSERT INTO ProductsTable (product_name, department_name, price, stock_quantity)
VALUES ("BLACK+DECKER 7-Quart Digital Slow Cooker with Chalkboard Surface, Slate, SCD4007", "Home", 33.00, 250);

INSERT INTO ProductsTable (product_name, department_name, price, stock_quantity)
VALUES ("DEWALT DCCS670X1 FLEXVOLT 60V MAX Brushless Chainsaw, 3.0AH battery", "Garden", 500.00, 100);

INSERT INTO ProductsTable (product_name, department_name, price, stock_quantity)
VALUES ("Landmann 26364 23-1/2-Inch Savannah Garden Light Fire Pit, Black", "Home", 80.00, 40);

INSERT INTO ProductsTable (product_name, department_name, price, stock_quantity)
VALUES ("Crown Mark Tyler 4-Piece Counter Height Table Set", "Furniture", 209.47, 100);

INSERT INTO ProductsTable (product_name, department_name, price, stock_quantity)
VALUES ("LINENSPA All-Season White Down Alternative", "Bed and Bath", 31.99, 100);

INSERT INTO ProductsTable (product_name, department_name, price, stock_quantity)
VALUES ("Garmin Speak with Amazon Alexa", "Automotive", 149.99, 100);


INSERT INTO ProductsTable (product_name, department_name, price, stock_quantity)
VALUES ("Q Founder Gen 2 Dark Brown Leather Wearable", "Electronics", 178.50, 100);



INSERT INTO DepartmentsTable (department_name)
	VALUES("Electronics");

INSERT INTO DepartmentsTable (department_name)
	VALUES("Home");

INSERT INTO DepartmentsTable (department_name)
	VALUES("Garden");

INSERT INTO DepartmentsTable (department_name)
	VALUES("Furniture");

INSERT INTO DepartmentsTable (department_name)
	VALUES("Automotive");
    
INSERT INTO DepartmentsTable (department_name)
	VALUES("Bed and Bath");    
    

Select * from productstable;

Select * from departmentstable;
