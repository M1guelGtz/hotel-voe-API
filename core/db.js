const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// Create a connection pool using environment variables (fall back to sensible defaults)
const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_SCHEMA || '',
  port: parseInt(process.env.DB_PORT || '8080', 10),
  waitForConnections: true,
  connectionLimit: parseInt(process.env.DB_CONN_LIMIT || '10', 10),
  queueLimit: 0,
});

async function testConnection() {
  try {
    const conn = await pool.getConnection();
    conn.release();
    return null;
  } catch (err) {
    return err.message || String(err);
  }
}

async function executePreparedQuery(query, params = []) {
  const [result] = await pool.execute(query, params);
  return result;
}

async function fetchRows(query, params = []) {
  const [rows] = await pool.execute(query, params);
  return rows;
}

module.exports = {
  pool,
  testConnection,
  executePreparedQuery,
  fetchRows,
};
