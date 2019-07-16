DROP DATABASE IF EXISTS bamazon1_db;

CREATE DATABASE bamazon1_db;

USE bamazon1_db;

CREATE TABLE products (
  item_id INTEGER NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(20) NOt NULL,
  departement_name VARCHAR(20) NOT NULL,
  price DECIMAL(5,2) NOT NULL,
  stock_quantity INTEGER(10) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name,departement_name,price,stock_quantity)
VALUES('tennis ball', ' sports' , 10.25 ,12),
        ('volleyball','sports', 25.99 ,32),
        ('basketball','sports', 99.00 ,10),
        ('bodywash', 'cosmetics ' ,20.23 ,6),
        ('colone', 'cosmetics ' ,100 ,4),
        ('shampoo', 'cosmetics ' ,7.23 ,50),
        ('harry potter',' books' , 12.76 ,2),
        ('composite workbook',' books' , 1.76 ,30),
        ('pens',' books' , 2.76 ,20),
        ('fresh flower', 'misc ',30.45,10);

select * from products;