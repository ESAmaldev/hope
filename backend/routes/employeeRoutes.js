const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');
const bcrypt = require('bcryptjs');

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  const user = req.user; // Assuming req.user is set by your authentication middleware
  if (user && user.role === 'admin') {
    next(); // Allow access
  } else {
    res.status(403).json({ message: 'Access denied. Admin role required.' });
  }
};

// Create a new employee (admin-only)
router.post('/create', isAdmin, async (req, res) => {
  const { username, password, role, name, position, department } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Insert the new employee into the database
    const [result1] = await pool.query(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, hashedPassword, role]
    );
    const [result2] = await pool.query(
      'INSERT INTO employees (username, name, position, department) VALUES (?,?,?,?)',
      [username, name, position, department]
    );
    res.status(201).json({ message: 'Employee created successfully', userId: result1.insertId });
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/fetch', async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM employees');
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching employee data', error);
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;