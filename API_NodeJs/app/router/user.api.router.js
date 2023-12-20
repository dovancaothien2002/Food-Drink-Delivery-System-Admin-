const db = require('../../connect');
const multer = require('multer');

module.exports = function (app) {
    // Account
  app.post('/api/register', function (req, res) {
    db.query("INSERT INTO  users SET ?", req.body, function (err, acc) {
      if (err) {
        res.send({ data: err, statusCode: 500, message: err.sqlMessage });
      } else {
        res.send({ data: req.body, statusCode: 200, message: 'Ok' });
      }
    });

  });
  app.post('/api/check_logins', function (req, res) {
    db.query("SELECT * FROM users WHERE email = ? AND password = ? ", [req.body.email, req.body.password, req.body], function (err, acc) {
      if (err) {
        res.send({ data: err, statusCode: 500, message: err.sqlMessage });
      }
      else {
        if (acc.length) {
          res.send({ data: acc[0], statusCode: 200, message: 'Ok' });
        }
        else {
          res.send({ data: null, statusCode: 404, message: 'Incorrect account' });
        }
      }
    });

  });

  app.post('/api/check_unique', function (req, res) {
    db.query("SELECT * FROM users WHERE email = ?", [req.body.email], function (err, acc) {
      if (err) {
        res.send({ data: err, statusCode: 500, message: err.sqlMessage });
      }
      else {
        console.log(acc.length);
        if (acc.length > 0) {
          res.send({ data: acc[0], statusCode: 200, message: 'This email address has been registered to the account' });
        }
        else {
          res.send({ data: null, statusCode: 404, message: 'OK' });
        }
      }
    });

  });

  app.post('/api/check_unique2', function (req, res) {
    db.query("SELECT * FROM users WHERE phone = ?", [req.body.phone], function (err, acc) {
      if (err) {
        res.send({ data: err, statusCode: 500, message: err.sqlMessage });
      }
      else {
        console.log(acc.length);
        if (acc.length > 0) {
          res.send({ data: acc[0], statusCode: 200, message: 'This phone address has been registered to the account' });
        }
        else {
          res.send({ data: null, statusCode: 404, message: 'OK' });
        }
      }
    });

  });

  // Favorites
  app.post('/api/favourites',async function (req, res) {
    let sql_check = "SELECT * FROM favourites WHERE user_id = ? AND product_id = ?";
    let favorites = await query(sql_check,[req.body.user_id, req.body.product_id])
    if (favorites.length == 0) {
      db.query("INSERT INTO  favourites SET ?", req.body, function (err, data) {
        if (err) {
          res.json({ result: "", statusCode: 500, message: err.sqlMessage });
        } else {
          req.body.id = data.insertId;
          res.json({ result: req.body, statusCode: 200, message: 'Yeu thich san pham thanh cong' });
        }
      });
    } else {
      db.query("DELETE FROM favourites WHERE user_id = ? AND product_id = ?", [req.body.user_id, req.body.product_id], function (err, data)  {
        if (err) {
          res.send({ result: "", statusCode: 500, message: err.sqlMessage });
        } else {
          res.send({ result: "", statusCode: 200, message: 'Bo yeu thich thanh cong' });
        }
      });
    }


  });
  app.get('/api/favourites/:user_id', function (req, res) {
    let user_id = req.params.user_id
    let sql = "SELECT f.user_id,f.product_id,p.name,p.image,p.price,p.sale_price FROM favourites f JOIN users u ON f.user_id = u.id JOIN products p ON f.product_id = p.id WHERE f.user_id = ? ";

    db.query(sql,[user_id], function (err, result) {
      if (err) {
        res.statusCode = 500;
        res.send({ product: err, statusCode: 500, message: err.sqlMessage });
      } else if (result.length === 0) {
        res.statusCode = 404;
        res.send({ product: null, statusCode: 404, message: 'Not Found' });
      } else {
        res.send({ product: result, statusCode: 200, message: 'Ok' });
      }
    });

  });

  app.get('/api/user', function (req, res) {
    db.query("SELECT * FROM users ORDER BY updatedate DESC", function (err, user) {
        if (err) {
            res.statusCode = 500;
            res.send({ result: err, statusCode: 500, message: err.sqlMessage });
        } else if (user.length === 0) {
            res.statusCode = 404;
            res.send({ result: null, statusCode: 404, message: 'Not Found' });
        } else {
            res.send({ result: user, statusCode: 200, message: 'Ok' });
        }
    });

  });

  app.get('/api/user/:id', function (req, res) {
    db.query("SELECT * FROM users WHERE id = ?", [req.params.id], function (err, user) {
        if (err) {
            res.statusCode = 500;
            res.send({ result: err, statusCode: 500, message: err.sqlMessage });
        } else if (user.length == 0) {
            res.statusCode = 404;
            res.send({ result: null, statusCode: 404, message: 'Not Found' });
        } else {
            res.send({ result: user[0], statusCode: 200, message: 'Ok' });
        }
    });

  });

  app.put('/api/user/:id', function (req, res) {
    db.query("UPDATE users SET ? WHERE id = ?", [req.body, req.params.id], function (err, store) {
        if (err) {
            res.statusCode = 500;
            res.send({ result: err, statusCode: 500, message: err.sqlMessage });
        } else {
            req.body.id = req.params.id;
            res.send({ result: req.body, statusCode: 200, message: 'Ok' });
        }
    });
  });

  app.post('/api/user_checkUpdate', function (req, res) {
      db.query("SELECT * FROM users WHERE email = ? AND id != ?", [req.body.email,req.body.id], function (err, acc) {
        if (err) {
          res.send({ data: err, statusCode: 500, message: err.sqlMessage });
        }
        else {
          console.log(acc.length);
          if (acc.length > 0) {
            res.send({ data: acc[0], statusCode: 200, message: 'This email address has been registered to the account' });
          }
          else {
            res.send({ data: null, statusCode: 404, message: 'OK' });
          }
        }
      });
  });

  app.post('/api/user_checkUpdate2', function (req, res) {
    db.query("SELECT * FROM users WHERE phone = ? AND id != ?", [req.body.phone,req.body.id], function (err, acc) {
      if (err) {
        res.send({ data: err, statusCode: 500, message: err.sqlMessage });
      }
      else {
        console.log(acc.length);
        if (acc.length > 0) {
          res.send({ data: acc[0], statusCode: 200, message: 'This email address has been registered to the account' });
        }
        else {
          res.send({ data: null, statusCode: 404, message: 'OK' });
        }
      }
    });
});

}