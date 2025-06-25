const mysql = require('mysql2/promise');
require('dotenv').config(); 

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  queueLimit: 0
};

let pool;
try {
  pool = mysql.createPool(dbConfig);
  console.log('[DB MySQL] Pool de conexões com MySQL criado.'); 
} catch (error) {
  console.error('[DB MySQL] Erro CRÍTICO ao criar o pool de conexões com MySQL:', error);
  process.exit(1);
}

module.exports = {
  query: async (sql, params) => {
    const start = Date.now();
    let connection;
    try {
      connection = await pool.getConnection();
      const [rows, fields] = await connection.execute(sql, params);
      const duration = Date.now() - start;
      return rows;

    } catch (error) {
      console.error('[DB MySQL Query Error] Erro ao executar query:', { sql: sql.substring(0, 100), params, error: error.message, stack: error.stack });
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }
};