const db = require('../../connect');
const multer = require('multer');
const url_link = 'http://192.168.31.88:3333/uploads/';
module.exports = function (app) {
    // API router
    app.get('/api/categories', function (req, res) {
        db.query("SELECT * FROM category ORDER BY updatedate DESC", function (err, category) {
            if (err) {
                res.statusCode = 500;
                res.send({ result: err, statusCode: 500, message: err.sqlMessage });
            } else if (category.length === 0) {
                res.statusCode = 404;
                res.send({ result: null, statusCode: 404, message: 'Not Found' });
            } else {
                let result = [];
                category.forEach(c => {
                  c.image = url_link + c.image
                  result.push(c)
                });
                res.send({ result: result, statusCode: 200, message: 'Ok' });
            }
        });

    });

    // Cấu hình upload image //
    var path = require('path')
    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, './public/uploads');
        },
        filename: (req, file, callback) => {
            callback(null, Date.now() + path.extname(file.originalname)) //Appending extension

        }
    });
    const uploadFile = multer({ storage: storage });

    app.get('/api/category', function (req, res) {
        let limit = 5;
        let key = req.query.key;
        let sql1 = "SELECT COUNT(*) as 'cat_count' FROM category";
        if (key) {
            sql1 = "SELECT COUNT(*) as 'cat_count' FROM category WHERE name LIKE '%" + key + "%'";
        }
        db.query(sql1, function (err, data) {
            let total = data[0].cat_count;
            let total_page = Math.ceil(total / limit);
            let page = req.query.page ? req.query.page : 1;
            let start = (page - 1) * limit;
            let sql = "SELECT * FROM category LIMIT ?,?";
            if (key) {
                sql = "SELECT * FROM category WHERE name LIKE '%" + key + "%' LIMIT ?,?"
            }
            db.query(sql, [start, limit], function (err, category) {
                // if (err) {
                //     res.statusCode = 500;
                //     res.send({ result: err, statusCode: 500, message: err.sqlMessage });
                // } else if (category.length === 0) {
                //     res.statusCode = 404;
                //     res.send({ result: null, statusCode: 404, message: 'Not Found' });
                // } else {
                res.send({
                    result: category,
                    page: page,
                    total: total,
                    total_page: total_page,
                    key: key,
                    statusCode: 200,
                    message: 'Ok'
                });
                // }
            })
        })
    });

    app.get('/api/category/:id', function (req, res) {
        db.query("SELECT * FROM category WHERE id = ?", [req.params.id], function (err, category) {
            if (err) {
                res.statusCode = 500;
                res.send({ result: err, statusCode: 500, message: err.sqlMessage });
            } else if (category.length == 0) {
                res.statusCode = 404;
                res.send({ result: null, statusCode: 404, message: 'Not Found' });
            } else {
                category[0].image = url_link + category[0].image
                res.send({ result: category[0], statusCode: 200, message: 'Ok' });
            }
        });

    });

    app.get('/api/category-detail/:id', function (req, res) {
        db.query("SELECT * FROM category WHERE id = ?", [req.params.id], function (err, category) {
            if (err) {
                res.statusCode = 500;
                res.send({ result: err, statusCode: 500, message: err.sqlMessage });
            } else if (category.length == 0) {
                res.statusCode = 404;
                res.send({ result: null, statusCode: 404, message: 'Not Found' });
            } else {
                category[0].image = url_link + category[0].image
                res.send({ result: category[0], statusCode: 200, message: 'Ok' });
            }
        });

    });

    app.get('/api/category-check/:key', function (req, res) {
        db.query("SELECT * FROM category WHERE name = ?", [req.params.key], function (err, category) {
            res.send({
                result: category,
                key: req.params.key,
                statusCode: 200,
                message: 'Ok'
            });
        });

    });

    app.get('/api/category-check2/:key/:cat_id', function (req, res) {
        db.query("SELECT * FROM category WHERE name = ? AND id != ?", [req.params.key,req.params.cat_id], function (err, category) {
            res.send({
                result: category,
                key: req.params.key,
                statusCode: 200,
                message: 'Ok'
            });
        });
  
      });

      app.get('/api/category_checkEdit/:id/:key', function (req, res) {
        db.query("SELECT * FROM category WHERE id != ? AND name = ?", [req.params.id,req.params.key], function (err, product) {
            res.send({
                result: product,
                statusCode: 200,
                message: 'Okkkk'
            });
        });
      });

      app.get('/api/category_checkDelete/:id', function (req, res) {
        db.query("SELECT * FROM products WHERE category_id = ?", [req.params.id], function (err, product) {
            res.send({
                result: product,
                statusCode: 200,
                message: 'ok'
            });
        });
      });


    app.post('/api/category', uploadFile.single('image'), function (req, res) {
        let fileName = req.file.filename;
        req.body.image = fileName;
        db.query("INSERT INTO  category SET ?", req.body, function (err, category) {
            if (err) {
                res.statusCode = 500;
                res.send({ result: err, statusCode: 500, message: err.sqlMessage });
            } else {
                req.body.id = category.insertid;
                res.send({ result: req.body, statusCode: 200, message: 'Ok' });
            }
        });

    });
    app.put('/api/category/:id', uploadFile.single('image'), function (req, res) {
        if (req.file || req.file != undefined) {
            let fileName = req.file.filename;
            req.body.image = fileName;
        }
        db.query("UPDATE category SET ? WHERE id = ?", [req.body, req.params.id], function (err, category) {
            if (err) {
                res.statusCode = 500;
                res.send({ result: err, statusCode: 500, message: err.sqlMessage });
            } else {
                req.body.id = req.params.id;
                res.send({ result: req.body, statusCode: 200, message: 'Ok' });
            }
        });

    });

    app.delete('/api/category/:id', function (req, res) {
        db.query("DELETE FROM category WHERE id = ?", req.params.id, function (err, result) {
            if (err) {
                res.statusCode = 500;
                res.send({ result: err, statusCode: 500, message: err.sqlMessage });
            } else {
                res.send({ result: null, statusCode: 200, message: 'Xóa danh mục thành công' });
            }
        })
    });


    //// REACT-NATIVE
    app.get('/api/categoriess', function (req, res) {
        db.query("SELECT * FROM category ORDER BY updatedate DESC", function (err, cat) {
            if (err) {
              res.statusCode = 500;
              res.send({ data: err, statusCode: 500, message: err.sqlMessage });
            } else if (cat.length === 0) {
              res.statusCode = 404;
              res.send({ data: null, statusCode: 404, message: 'Not Found' });
            } else {
              let result = [];
              cat.forEach(c => {
                c.image = url_link + c.image
                result.push(c)
              });
              res.send({ data: result, statusCode: 200, message: 'Ok' });
            }
          });

    });

}