const db = require('../../connect');
const multer = require('multer');
module.exports = function (app) {
    // Cấu hình upload image //
    var path = require('path')

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
        }
    })

    var upload = multer({ storage: storage });
    // Hiển thị danh sách sản phẩm
    app.get('/product', function (req, res) {
        let limit = 5;
        let key = req.query.key;
        let sql1 = "SELECT COUNT(*) as 'cat_count' FROM products";
        if (key) {
            sql1 = "SELECT COUNT(*) as 'cat_count' FROM products WHERE name LIKE '%" + key + "%'";
        }
        db.query(sql1, function (err, data) {
            let total = data[0].cat_count;
            let total_page = Math.ceil(total / limit);
            let page = req.query.page ? req.query.page : 1;
            let start = (page - 1) * limit;
            let sql = "SELECT p.*,c.name as cat_name FROM products p JOIN category c ON c.id = p.category_id LIMIT ?,?";
            if (key) {
                sql = "SELECT p.*,c.name as cat_name FROM products p JOIN category c ON c.id = p.category_id WHERE p.name LIKE '%" + key + "%' LIMIT ?,?"
            }


            db.query(sql, [start, limit], function (err, product) {
                res.render('product/list', {
                    products: product,
                    page: page,
                    total_page: total_page,
                    key: key
                });
            });
        });
    });


    // Thêm mới sản phẩm
    app.get('/product-add', function (req, res) {
        db.query("SELECT id, name FROM category ORDER BY name ASC", function (err, category) {
            res.render('product/add', {
                cats: category
            });

        });
    });
    app.post('/product-add', upload.single('myfile'), function (req, res) {
        var filename = req.file.filename;
        req.body.image = filename;
        db.query("INSERT INTO products SET ?", req.body, function (err, data) {
            if (err) {
                res.render('errorr', {
                    code: 404,
                    message: err.message
                });
            } else {
                res.redirect('/product')

            }
        });
    });
    // Sửa sản phẩm  //
    app.get('/product/edit_pro/:id', function (req, res) {
        let id = req.params.id;
        let sql = "SELECT * FROM products WHERE id = " + id;

        db.query(sql, function (err, cat) {
            if (err) {
                res.render('errorr', {
                    code: 404,
                    message: 'Ko thể sửa sản phẩm này'
                });
                // throw new Error()
            } else {
                if (cat.length) {
                    db.query("SELECT id, name FROM category ORDER BY name ASC", function (err, category) {
                        res.render('product/edit', {
                            cats: category,
                            pro: cat[0]
                        });

                    });
                } else {
                    res.render('errorr', {
                        code: 404,
                        message: 'Không tìm thấy sản phẩm này hoăc trang không tồn tại'
                    });
                }

            }

        });

    });
    app.post('/edit_pro/:id', upload.single('myfile'), function (req, res) {
        let id = req.params.id;
        if (req.file || req.file != undefined) {
            var filename = req.file.filename;
            req.body.image = filename;
        }
        db.query("UPDATE products SET ? WHERE id = ?", [req.body, id], function (err, data) {
            if (err) {
                res.render('errorr', {
                    code: 404,
                    message: err.sqlMessage,
                });
            } else {
                res.redirect('/product')

            }
        });
    });
    // Xóa sản phẩm 
    app.get('/product/delete_pro/:id', function (req, res) {
        let id = req.params.id;
        let sql = "DELETE FROM products WHERE id = " + id;
        db.query(sql, function (err, cat) {
            if (err) {
                res.render('error', {
                    code: 404,
                    message: 'Lỗi rồi bạn ơi '
                });
            } else {
                res.redirect('/product')
            }
        })

    });
}