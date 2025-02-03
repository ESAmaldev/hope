const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
require('dotenv').config();

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function createAdmin() {
  const username = 'adminuser';
  const plainPassword = 'Admin@123'; // Choose a strong password
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  try {
    const [result] = await pool.query(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, hashedPassword, 'admin']
    );
    console.log('✅ Admin user created successfully!');
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      console.error('❌ Admin user already exists!');
    } else {
      console.error('❌ Error creating admin user:', error);
    }
  } finally {
    await pool.end(); // Close the connection
  }
}

createAdmin();

