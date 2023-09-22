const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');

app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'restaurant_db',
});

db.connect((err) => {
    if (err) {
        console.error('Database connection error: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});

module.exports = db;
// Get all restaurants
app.get('/api/restaurants', (req, res) => {
    const query = 'SELECT * FROM restaurants';
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error retrieving restaurants:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(200).json(results);
      }
    });
  });
  
  // Get menus for a specific restaurant
  app.get('/api/menus/:restaurantId', (req, res) => {
    const restaurantId = req.params.restaurantId;
    const query = 'SELECT * FROM food_menus WHERE restaurant_id = ?';
  
    db.query(query, [restaurantId], (err, results) => {
      if (err) {
        console.error('Error retrieving menus:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(200).json(results);
      }
    });
  });
  
  // Get food items for a specific menu
  app.get('/api/items/:menuId', (req, res) => {
    const menuId = req.params.menuId;
    const query = 'SELECT * FROM food_items WHERE menu_id = ?';
  
    db.query(query, [menuId], (err, results) => {
      if (err) {
        console.error('Error retrieving items:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(200).json(results);
      }
    });
  });
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
