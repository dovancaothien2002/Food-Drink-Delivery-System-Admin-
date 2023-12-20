const db = require('../../connect');
module.exports = function (app) {
    app.post('/api/check_login', function (req, res) {
        db.query("SELECT * FROM account WHERE email = ? AND password = ? ", [req.body.email, req.body.password, req.body], function (err, acc) {
            if (err) {
                res.send({ result: err, statusCode: 500, message: err.sqlMessage });
            }
            else {
                if (acc.length) {
                    res.send({ result: acc[0], statusCode: 200, message: 'Ok' });
                }
                else {
                    res.send({ result: null, statusCode: 404, message: 'Tai khoan khong hop le' });
                }
            }
        });

    });
}