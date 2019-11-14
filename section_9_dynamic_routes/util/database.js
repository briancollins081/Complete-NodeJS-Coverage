const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    username: 'nodejs',
    database: 'node-complete',
    password: 'Nodejs-complete'
});

module.exports = pool.promise();