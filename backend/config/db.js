require("dotenv").config();
const mysql = require("mysql2/promise");

const createPool = async () => {
  try {
    const pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      waitForConnections: true,
      connectionLimit: 5, // Reduced limit for serverless
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10000,
    });
    
    // Test the connection
    const connection = await pool.getConnection();
    console.log("Connected to MySQL database");
    connection.release();
    
    return pool;
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
};

// Export an async function that returns a connection
module.exports = createPool();

