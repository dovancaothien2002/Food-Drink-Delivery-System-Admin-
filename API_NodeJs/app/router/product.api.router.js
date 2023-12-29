const db = require('../../connect');
const multer = require('multer');
const util = require('node:util');
const query = util.promisify(db.query).bind(db);
const url_link = 'http://192.168.31.88:3333/uploads/';

module.exports = function (app) {
    // Cấu hình upload image //
    let path = require('path')
    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, './public/uploads');
        },
        filename: (req, file, callback) => {
            callback(null, Date.now() + path.extname(file.originalname)) //Appending extension

        }
    });
    
    const uploadFile = multer({ storage: storage });
   
    // Hiển thị danh sách sản phẩm
    app.get('/api/product', function (req, res) {
        db.query("SELECT p.id,p.name,p.price,p.sale_price,p.status,p.image,c.name as cat_name FROM products p JOIN category c ON c.id = p.category_id ORDER BY P.updatedate DESC", function (err, product) {
            if (err) {
                res.statusCode = 500;
                res.send({ result: err, statusCode: 500, message: err.sqlMessage });
            } else if (product.length === 0) {
                res.statusCode = 404;
                res.send({ result: null, statusCode: 404, message: 'Not Found' });
            } else {
                let result = [];
                product.forEach(p => {
                  p.image = url_link + p.image
                  result.push(p)
                });
                res.send({ result: result, statusCode: 200, message: 'Ok' });
            }
        });

    });

    app.get('/api/product/:id', function (req, res) {
        db.query("SELECT * FROM products WHERE id = ?", [req.params.id], function (err, product) {
            if (err) {
                res.statusCode = 500;
                res.send({ result: err, statusCode: 500, message: err.sqlMessage });
            } else if (product.length == 0) {
                res.statusCode = 404;
                res.send({ result: null, statusCode: 404, message: 'Not Found' });
            } else {
              product[0].image = url_link + product[0].image
                res.send({ result: product[0], statusCode: 200, message: 'Ok' });
            }
        });

    });
    app.post('/api/product', uploadFile.single('image'), function (req, res) {
        let fileName = req.file.filename;
        req.body.image = fileName;
        db.query("INSERT INTO  products SET ?", req.body, function (err, product) {
            if (err) {
                res.statusCode = 500;
                res.send({ result: err, statusCode: 500, message: err.sqlMessage });
            } else {
                req.body.id = product.insertid;
                res.send({ result: req.body, statusCode: 200, message: 'Ok' });
            }
        });

    });
    app.put('/api/product/:id', uploadFile.single('image'), function (req, res) {
        if (req.file || req.file != undefined) {
            let fileName = req.file.filename;
            req.body.image = fileName;
        }
        db.query("UPDATE products SET ? WHERE id = ?", [req.body, req.params.id], function (err, product) {
            if (err) {
                res.statusCode = 500;
                res.send({ result: err, statusCode: 500, message: err.sqlMessage });
            } else {
                req.body.id = req.params.id;
                res.send({ result: req.body, statusCode: 200, message: 'Ok' });
            }
        });

    });
    app.delete('/api/product/:id', function (req, res) {
        db.query("DELETE FROM products WHERE id = ?", req.params.id, function (err, product) {
            if (err) {
                res.statusCode = 500;
                res.send({ result: err, statusCode: 500, message: err.sqlMessage });
            } else {
                res.send({ result: null, statusCode: 200, message: 'Xóa danh mục thành công' });
            }
        })
    });
    
    app.get('/api/product-check/:key', function (req, res) {
        db.query("SELECT * FROM products WHERE name = ?", [req.params.key], function (err, product) {
            res.send({
                result: product,
                key: req.params.key,
                statusCode: 200,
                message: 'Ok'
            });
        });

    });

    app.get('/api/product-check2/:key/:prod_id', function (req, res) {
      db.query("SELECT * FROM products WHERE name = ? AND id != ?", [req.params.key,req.params.prod_id], function (err, store) {
          res.send({
              result: store,
              key: req.params.prod_id,
              statusCode: 200,
              message: 'Okkkkk'
          });
      });

    });

    app.get('/api/product_checkDelete/:id', function (req, res) {
      let check = 0;
      db.query("SELECT * FROM order_detail WHERE product_id = ?", [req.params.id], function (err, product) {
        db.query("SELECT * FROM favourites WHERE product_id = ?", [req.params.id], function (err, prod) {
          check += product.length;
          check += prod.length;
          res.send({
            result: check,
            statusCode: 200,
            message: 'Okkkk'
          });
        });
      }); 
    });

    app.get('/api/product_checkEdit/:id/:key', function (req, res) {
      db.query("SELECT * FROM products WHERE id != ? AND name = ?", [req.params.id,req.params.key], function (err, product) {
          res.send({
              result: product,
              statusCode: 200,
              message: 'Okkkk'
          });
      });
    });

    app.get('/api/product-detail/:id', function (req, res) {
      db.query("SELECT p.*,c.name as cat_name FROM products p JOIN category c ON c.id = p.category_id WHERE p.id = ?", [req.params.id], function (err, product) {
          if (err) {
              res.statusCode = 500;
              res.send({ result: err, statusCode: 500, message: err.sqlMessage });
          } else if (product.length == 0) {
              res.statusCode = 404;
              res.send({ result: null, statusCode: 404, message: 'Not Found' });
          } else {
            product[0].image = url_link + product[0].image
              res.send({ result: product[0], statusCode: 200, message: 'Ok' });
          }
      });

  });

    
    ///// REACT - NATIVE
 // API router
  app.get('/api/products', function (req, res) {
    let key = req.query.key;
    let sql = "SELECT p.*, c.name as cat_name FROM products p JOIN category c ON p.category_id = c.id  ORDER BY id LIMIT 20";
    if (key) {
      sql = "SELECT * FROM products WHERE name LIKE '%" + key + "%'";
    }
    db.query(sql, [key], function (err, pro) {
      if (err) {
        res.statusCode = 500;
        res.send({ product: err, statusCode: 500, message: err.sqlMessage });
      } else if (pro.length === 0) {
        res.statusCode = 404;
        res.send({ product: null, statusCode: 404, message: 'Not Found' });
      } else {
        let result = [];
        pro.forEach(p => {
          p.image = url_link + p.image
          result.push(p)
        });
        res.send({ product: result, statusCode: 200, message: 'Ok' });
      }
    });
  });

  app.get('/api/product-hot', function (req, res) {
    db.query("SELECT p.*, c.name as cat_name FROM products p JOIN category c ON p.category_id = c.id WHERE p.sale_price = 0 ORDER BY id ", function (err, pro) {
      if (err) {
        res.statusCode = 500;
        res.send({ product: err, statusCode: 500, message: err.sqlMessage });
      } else if (pro.length === 0) {
        res.statusCode = 404;
        res.send({ product: null, statusCode: 404, message: 'Not Found' });
      } else {
        res.send({ product: pro, statusCode: 200, message: 'Ok' });
      }
    });

  });

  app.get('/api/product-sale', function (req, res) {
    db.query("SELECT p.*, c.name as cat_name FROM products p JOIN category c ON p.category_id = c.id WHERE p.sale_price > 0 ORDER BY id DESC LIMIT 8", function (err, pro) {
      if (err) {
        res.statusCode = 500;
        res.send({ product: err, statusCode: 500, message: err.sqlMessage });
      } else if (pro.length === 0) {
        res.statusCode = 404;
        res.send({ product: null, statusCode: 404, message: 'Not Found' });
      } else {
        res.send({ product: pro, statusCode: 200, message: 'Ok' });
      }
    });

  });

  app.get('/api/product-by-cat-id/:id', function (req, res) {
    let catid = req.params.id
    db.query("SELECT p.*, c.name as cat_name FROM products p JOIN category c ON p.category_id = c.id WHERE category_id = ? ORDER BY id DESC LIMIT 8", catid, function (err, pro) {
      if (err) {
        res.send({ product: err, statusCode: 500, message: err.sqlMessage });
      } else if (pro.length === 0) {
        res.send({ product: null, statusCode: 404, message: 'Not Found' });
      } else {
        let result = [];
        pro.forEach(p => {
          p.image = url_link + p.image
          result.push(p)
        });
        res.send({ product: result, statusCode: 200, message: 'Ok' });
        // res.send({ product: pro, statusCode: 200, message: 'Ok' });
      }
    });

  });
  app.get('/api/product-detail/:id', function (req, res) {
    let proid = req.params.id
    db.query("SELECT p.*, c.name as cat_name FROM products p JOIN category c ON p.category_id = c.id WHERE p.id = ? ORDER BY id DESC LIMIT 4", proid, function (err, pro) {
      if (err) {
        res.send({ product: err, statusCode: 500, message: err.sqlMessage });
      } else if (pro.length === 0) {
        res.send({ product: null, statusCode: 404, message: 'Not Found' });
      } else {
        res.send({ product: pro[0], statusCode: 200, message: 'Ok' });
      }
    });

  });


///
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
        res.json({ result: req.body, statusCode: 200, message: 'Add Favourite Success' });
      }
    });
  } else {
    db.query("DELETE FROM favourites WHERE user_id = ? AND product_id = ?", [req.body.user_id, req.body.product_id], function (err, data)  {
      if (err) {
        res.send({ result: "", statusCode: 500, message: err.sqlMessage });
      } else {
        res.send({ result: "", statusCode: 200, message: 'Delete Success' });
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
        let list = [];
        result.forEach(p => {
          p.image = url_link + p.image
          list.push(p)
        });
        res.send({ product: list, statusCode: 200, message: 'Ok' });
      }
    });

  });

}