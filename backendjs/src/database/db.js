const mysql = require('mysql2');

const pool = mysql.createPool({
  host:     process.env.DB_HOST     || 'localhost',
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME     || 'app_db',
  port:     process.env.DB_PORT     || 3306,
}).promise();

pool.getConnection()
  .then(conn => {
    console.log('✅ Banco de dados conectado com sucesso');
    conn.release();
  })
  .catch(err => {
    console.error('❌ Erro ao conectar no banco:', err.message);
  });


module.exports = pool;