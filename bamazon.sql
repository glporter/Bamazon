DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE ProductsTable (
  item_id INT NOT NULL auto_increment,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR (50) NULL,
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
VALUES ("Calphalon Classic 10-Piece Cookware", "Home", 148.00, 50);

INSERT INTO ProductsTable (product_name, department_name, price, stock_quantity)
VALUES ("BLACK+DECKER 7-Quart Digital Slow Cooker", "Home", 33.00, 250);

INSERT INTO ProductsTable (product_name, department_name, price, stock_quantity)
VALUES ("DEWALT DCCS670X1 FLEXVOLT 60V MAX Brushless Chainsaw", "Garden", 500.00, 100);

INSERT INTO ProductsTable (product_name, department_name, price, stock_quantity)
VALUES ("Landmann 26364 23-1/2-Inch Savannah Garden Light Fire Pit", "Home", 80.00, 40);

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

Select * from bamazon.departmentstable;

Select * from bamazon.ProductsTable;


Delete from bamazon.ProductsTable where item_id = 11;

UPDATE bamazon.ProductsTable
SET department_id = 5
WHERE item_id = 13;

UPDATE bamazon.departmentstable
SET over_head_costs = 25000
WHERE department_id = 6;

UPDATE bamazon.ProductsTable
SET product_sales = 10000
WHERE item_id = 13;


Select departmentstable.department_id, departmentstable.department_name, productstable.product_sales - departmentstable.over_head_costs as "total Profit", departmentstable.over_head_costs from bamazon.departmentstable LEFT JOIN bamazon.productstable on bamazon.departmentstable.department_id = bamazon.productstable.department_id;
