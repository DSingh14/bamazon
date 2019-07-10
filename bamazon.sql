DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INTEGER NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(20) NOt NULL,
  departement_name VARCHAR(20) NOT NULL,
  price DECIMAL(5,2) NOT NULL,
  stock_price INTEGER(10) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name,departement_name,price,stock_price)
VALUES('tennis ball', ' sports' , 10.25 ,120),
        ('volleyball','sports', 25.99 ,352),
        ('Basketball','sports', 99.00 ,100),
        ('Bodywash', 'cosmetics ' ,20.23 ,60),
        ('Colone', 'cosmetics ' ,100 ,80),
        ('Shampoo', 'cosmetics ' ,7.23 ,50),
        ('Harry Potter',' books' , 12.76 ,20),
        ('Composite workbook',' books' , 1.76 ,30),
        ('Pens',' books' , 2.76 ,200),
        ('Fresh flower', 'Misc ',30.45,10);

select * from products;