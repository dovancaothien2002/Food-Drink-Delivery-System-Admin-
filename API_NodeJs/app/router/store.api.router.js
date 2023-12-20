const db = require('../../connect');
const multer = require('multer');

module.exports = function (app) {
   // Store
  app.get('/api/store', function (req, res) {
    db.query("SELECT * FROM store ORDER BY id DESC", function (err, st) {
      if (err) {
        res.statusCode = 500;
        res.send({ store: err, statusCode: 500, message: err.sqlMessage });
      } else if (st.length === 0) {
        res.statusCode = 404;
        res.send({ store: null, statusCode: 404, message: 'Not Found' });
      } else {
        res.send({ store: st, statusCode: 200, message: 'Ok' });
      }
    });

  });

  app.get('/api/store/:id', function (req, res) {
    db.query("SELECT * FROM store WHERE id = ?", [req.params.id], function (err, st) {
        if (err) {
            res.statusCode = 500;
            res.send({ result: err, statusCode: 500, message: err.sqlMessage });
        } else if (st.length == 0) {
            res.statusCode = 404;
            res.send({ result: null, statusCode: 404, message: 'Not Found' });
        } else {
            res.send({ result: st[0], statusCode: 200, message: 'Ok' });
        }
    });

  });

  app.get('/api/store/:id', function (req, res) {
    db.query("SELECT * FROM store WHERE id = ?", [req.params.id], function (err, st) {
        if (err) {
            res.statusCode = 500;
            res.send({ result: err, statusCode: 500, message: err.sqlMessage });
        } else if (st.length == 0) {
            res.statusCode = 404;
            res.send({ result: null, statusCode: 404, message: 'Not Found' });
        } else {
            res.send({ result: st[0], statusCode: 200, message: 'Ok' });
        }
    });

  });

  app.post('/api/store', function (req, res) {
    db.query("INSERT INTO store SET ?", req.body, function (err, store) {
        if (err) {
            res.statusCode = 500;
            res.send({ result: err, statusCode: 500, message: err.sqlMessage });
        } else {
            req.body.id = store.insertid;
            res.send({ result: req.body, statusCode: 200, message: 'Ok' });
        }
    });

  });
  app.put('/api/store/:id', function (req, res) {
    db.query("UPDATE store SET ? WHERE id = ?", [req.body, req.params.id], function (err, store) {
        if (err) {
            res.statusCode = 500;
            res.send({ result: err, statusCode: 500, message: err.sqlMessage });
        } else {
            req.body.id = req.params.id;
            res.send({ result: req.body, statusCode: 200, message: 'Ok' });
        }
    });

    });

    app.delete('/api/store/:id', function (req, res) {
        db.query("DELETE FROM store WHERE id = ?", req.params.id, function (err, result) {
            if (err) {
                res.statusCode = 500;
                res.send({ result: err, statusCode: 500, message: err.sqlMessage });
            } else {
                res.send({ result: null, statusCode: 200, message: 'Xóa danh mục thành công' });
            }
        })
    });

    app.get('/api/store-check/:key', function (req, res) {
      db.query("SELECT * FROM store WHERE name = ?", [req.params.key], function (err, store) {
          res.send({
              result: store,
              key: req.params.key,
              statusCode: 200,
              message: 'Ok'
          });
      });

    });

    app.get('/api/store-check2/:key/:store_id', function (req, res) {
      db.query("SELECT * FROM store WHERE name = ? AND id != ?", [req.params.key,req.params.store_id], function (err, store) {
          res.send({
              result: store,
              key: req.params.key,
              statusCode: 200,
              message: 'Okkkk'
          });
      });

    });

    app.get('/api/store_checkDelete/:id', function (req, res) {
        db.query("SELECT * FROM savedaddress WHERE store_id = ?", [req.params.id], function (err, sa) {
            res.send({
                result: sa,
                statusCode: 200,
                message: 'Ok'
            });
        });
      });

}