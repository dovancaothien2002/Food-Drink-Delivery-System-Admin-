const db = require('../../connect');
const multer = require('multer');

module.exports = function (app) {
   
    app.get('/api/saveaddress-by-user-id/:id', function (req, res) {
        let user_id = req.params.id
        db.query("SELECT s.id,s.useraddress,s.status,s.detailaddress,s.note,st.id as store_id,st.name as store_name,st.fulladdress as store_address FROM savedaddress s JOIN store st ON s.store_id = st.id WHERE user_id = ? ORDER BY s.id", user_id, function (err, data) {
          if (err) {
            res.send({ savedaddress: err, statusCode: 500, message: err.sqlMessage });
          }else {
            res.send({ savedaddress: data, statusCode: 200, message: 'Ok' });
          }
        });
    
      });
    
      app.put('/api/update-savedaddress', function (req, res) {
        db.query("UPDATE savedaddress SET status = 0 WHERE user_id = ?", req.body.user_id, function (err, results) {
          if (err) {
            res.send({ data: err, statusCode: 500, message: err.sqlMessage });
          } else {
            res.send({ data: req.body, statusCode: 200, iD: results.insertId });
          }
        });
      });
    
      app.put('/api/update-savedaddress2', function (req, res) {
        db.query("UPDATE savedaddress SET status = 1 WHERE id = ?", req.body.sa_id, function (err, results) {
          if (err) {
            res.send({ data: err, statusCode: 500, message: err.sqlMessage });
          } else {
            res.send({ data: req.body, statusCode: 200, iD: results.insertId });
          }
        });
    
      });
    
      app.put('/api/savedaddress', function (req, res) {
        db.query("UPDATE savedaddress SET ? WHERE id = ?", [req.body, req.body.id], function (err, acc) {
          if (err) {
            res.statusCode = 500;
            res.send({ data: err, statusCode: 500, message: err.sqlMessage });
          } else {
            // req.body.id = req.params.id;
            res.send({ data: req.body, statusCode: 200, message: 'Ok' });
          }
        });
    
      });
    
      app.post('/api/savedaddress', function (req, res) {
        db.query("INSERT INTO savedaddress SET ?", req.body, function (err, results) {
          if (err) {
            res.send({ data: err, statusCode: 500, message: err.sqlMessage });
          } else {
            res.send({ data: req.body, statusCode: 200, iD: results.insertId });
          }
        });
    
      });
      app.delete('/api/savedaddress/:id', function (req, res) {
        db.query("DELETE FROM savedaddress WHERE id = ?", req.params.id, function (err, data) {
          if (err) {
            res.statusCode = 500;
            res.send({ data: err, statusCode: 500, message: err.sqlMessage });
          } else {
            res.send({ data: null, statusCode: 200, message: 'Xóa danh mục thành công' });
          }
        })
      });
    
}