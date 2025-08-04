# Test

create database Think41;

use Think41;

-- 1. distribution_centers
CREATE TABLE distribution_centers (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6)
);

-- 2. products
CREATE TABLE products (
    id INT PRIMARY KEY,
    cost DECIMAL(10,2),
    category VARCHAR(255),
    name VARCHAR(255),
    brand VARCHAR(255),
    retail_price DECIMAL(10,2),
    department VARCHAR(255),
    sku VARCHAR(100),
    distribution_center_id INT,
    FOREIGN KEY (distribution_center_id) REFERENCES distribution_centers(id)
);

-- 3. inventory_items
CREATE TABLE inventory_items (
    id INT PRIMARY KEY,
    product_id INT,
    created_at DATETIME,
    sold_at DATETIME,
    cost DECIMAL(10,2),
    product_category VARCHAR(255),
    product_name VARCHAR(255),
    product_brand VARCHAR(255),
    product_retail_price DECIMAL(10,2),
    product_department VARCHAR(255),
    product_sku VARCHAR(100),
    product_distribution_center_id INT,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (product_distribution_center_id) REFERENCES distribution_centers(id)
);

-- 4. users
CREATE TABLE users (
    id INT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    age INT,
    gender VARCHAR(50),
    state VARCHAR(100),
    street_address VARCHAR(255),
    postal_code VARCHAR(20),
    city VARCHAR(100),
    country VARCHAR(100),
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    traffic_source VARCHAR(100),
    created_at DATETIME
);

-- 5. orders
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    user_id INT,
    status VARCHAR(50),
    gender VARCHAR(50),
    created_at DATETIME,
    returned_at DATETIME,
    shipped_at DATETIME,
    delivered_at DATETIME,
    num_of_item INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 6. order_items
CREATE TABLE order_items (
    id INT PRIMARY KEY,
    order_id INT,
    user_id INT,
    product_id INT,
    inventory_item_id INT,
    status VARCHAR(50),
    created_at DATETIME,
    shipped_at DATETIME,
    delivered_at DATETIME,
    returned_at DATETIME,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (inventory_item_id) REFERENCES inventory_items(id)
);


show tables;


LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/users.csv'
INTO TABLE users
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(id, first_name, last_name, email, age, gender, state, street_address, postal_code, city, country, latitude, longitude, traffic_source, created_at);

LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/orders.csv'
INTO TABLE orders
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(order_id, user_id, status, gender, @created_at, @returned_at, @shipped_at, @delivered_at, num_of_item)
SET 
    created_at = NULLIF(@created_at, ''),
    returned_at = NULLIF(@returned_at, ''),
    shipped_at = NULLIF(@shipped_at, ''),
    delivered_at = NULLIF(@delivered_at, '');




select * from orders;

select * from users;
SHOW VARIABLES LIKE 'secure_file_priv';
