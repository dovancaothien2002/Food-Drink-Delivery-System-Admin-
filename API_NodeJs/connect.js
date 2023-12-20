const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ql_banhang'
});

db.connect(function (err) {
    if (err) throw new Error('Kết nối không thành công');
});
module.exports = db;



