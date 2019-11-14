const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'nodejs',
    database: 'node-complete',
    password: 'Nodejs-complete'
});

module.exports = pool.promise();