const mysql = require('mysql2');


const conexion = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    password: process.env.DB_PASSWORD || '',
    user: process.env.DB_USER || 'root',
    database: process.env.DB_DATABSE || 'test',
    port: process.env.DB_PORT || 3306,
    connectionLimit: 15,
})

module.exports = { conexion };