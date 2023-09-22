CREATE DATABASE restaurant_db;
USE restaurant_db;


CREATE TABLE restaurants (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        type ENUM('Indian', 'Italian', 'Chinese') NOT NULL
    );

CREATE TABLE food_menus (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        restaurant_id INT,
        FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
     );

CREATE TABLE food_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        menu_id INT,
        FOREIGN KEY (menu_id) REFERENCES food_menus(id)
    );

INSERT INTO restaurants (name, type) VALUES
  ('Restaurant A', 'Indian'),
  ('Restaurant B', 'Italian'),
  ('Restaurant C', 'Chinese');

INSERT INTO food_menus (name, restaurant_id) VALUES
  ('Menu 1', 1),
  ('Menu 2', 1),
  ('Menu 3', 2),
  ('Menu 4', 3);

INSERT INTO food_items (name, price, description, menu_id) VALUES
  ('Dish 1', 10.99, 'Description for Dish 1', 1),
  ('Dish 2', 8.49, 'Description for Dish 2', 1),
  ('Dish 3', 12.99, 'Description for Dish 3', 2),
  ('Dish 4', 14.99, 'Description for Dish 4', 2),
  ('Dish 5', 9.99, 'Description for Dish 5', 3),
  ('Dish 6', 11.49, 'Description for Dish 6', 4); 