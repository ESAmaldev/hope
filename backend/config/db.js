const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test the database connection
const connectDB = async () => {
  try {
    const connection = await pool.promise().getConnection();
    console.log('MySQL Connected');
    connection.release(); // Release the connection back to the pool
  } catch (error) {
    console.error('Error connecting to MySQL:', error.message);
    process.exit(1); // Exit the process if the connection fails
  }
};

// Export the pool and connectDB function
module.exports = { pool: pool.promise(), connectDB };