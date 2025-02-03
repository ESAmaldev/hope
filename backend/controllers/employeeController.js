const pool = require('../config/db');

// Add a new employee
exports.addEmployee = async (req, res) => {
  const { name, position, department } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO employees (name, position, department) VALUES (?, ?, ?)',
      [name, position, department]
    );
    res.status(201).json({ message: 'Employee added successfully', employeeId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all employees
exports.getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM employees');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};