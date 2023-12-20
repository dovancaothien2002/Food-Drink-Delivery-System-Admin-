const db = require('../../connect');

module.exports = function (app) {
   // Hiển thị danh sách danh mục //
app.get('/category', function (req, res) {
    let limit = 5;
    let key = req.query.key;
    let sql1 = "SELECT COUNT(*) as 'cat_count' FROM category";
    if(key){
        sql1 ="SELECT COUNT(*) as 'cat_count' FROM category WHERE name LIKE '%"+key+"%'";
    }
    db.query(sql1, function (err, data) {
        let total = data[0].cat_count;
        let total_page = Math.ceil(total/limit);
        let page = req.query.page ? req.query.page : 1;
        let start = (page - 1) * limit;

        
        let sql = "SELECT * FROM category LIMIT ?,?";
        if(key){
            sql ="SELECT * FROM category WHERE name LIKE '%"+key+"%' LIMIT ?,?"
        }
            
    
        db.query(sql,[start,limit], function (err, cat) {
            res.render('category/list', {
                menuActived: 'category',
                cats: cat,
                page: page,
                total_page: total_page,
                key: key
            });
        })
    })
});
// Sửa danh mục  //
app.get('/category/edit/:id', function (req, res) {
    let id = req.params.id;
    let sql = "SELECT * FROM category WHERE id = " + id;
    db.query(sql, function (err, cat) {
        if (err) {
            res.render('error', {
                code: 500,
                message: 'Ko thể sửa danh mục này'
            });
            // throw new Error()
        } else {
            if (cat.length) {
                res.render('category/edit',
                {
                    data: cat[0]
                });
            } else {
                res.render('category/edit', {
                code: 404,
                message: err.sqlMessage
            });
            }
            
        }
           
    });
    
});
app.post('/edit/:id',function (req, res) {
    let id = req.params.id;
    db.query("UPDATE category SET ? WHERE id = ?", [req.body,id], function (err, data) {
        if (err) { 
            res.render('category/edit', {
                code: 500,
                message: err.sqlMessage
            });
        } else {
            res.redirect('/category')

        }
    });
});
// Xóa danh mục //
app.get('/category/delete/:id', function (req, res) {
    let id = req.params.id;
    let sql = "DELETE FROM category WHERE id = " + id;
    db.query(sql, function (err, cat) {
        if (err) {
            res.render('error', {
                code: 500,
                message: 'Bạn không thể xóa danh mục này, vì đang có sản phẩm tham chiếu'
            });
            // throw new Error()
        } else {
                res.redirect('/category')
        }
    })
   
});
// Thêm mới danh mục //
app.get('/category-add', function (req, res) {
    res.render('category/add')
})
app.post('/category-add',function (req, res) {
    db.query("INSERT INTO category SET ?", req.body, function (err, data) {
        if (err) {
            res.render('error', {
                code: 500,
                message: 'Danh mục này đã tồn tại, mời bạn chọn một danh mục khác'
            });
        } else {
            res.redirect('/category')

        }
    });
});
}