const db = require('../../connect');
const multer = require('multer');
const url_link = 'http://192.168.31.88:3333/uploads/';
module.exports = function (app) {
    // Orders
  app.post('/api/orders', function (req, res) {
    db.query("INSERT INTO  orders SET ?", req.body, function (err, results) {
      if (err) {
        res.send({ data: err, statusCode: 500, message: err.sqlMessage });
      } else {
        res.send({ data: req.body, statusCode: 200, iD: results.insertId });
      }
    });

  });
  
  app.post('/api/order_detail', function (req, res) {
    db.query("INSERT INTO  order_detail SET ?", req.body, function (err, acc) {
      if (err) {
        res.send({ data: err, statusCode: 500, message: err.sqlMessage });
      } else {
        res.send({ data: req.body, statusCode: 200, message: 'Ok' });
      }
    });

  });

  app.get('/api/list_orders', function (req, res) {
    let sql = "SELECT o.*,u.name as user_name,u.email as user_email,u.phone as user_phone,s.name as store_name FROM orders o JOIN users u ON o.user_id = u.id JOIN store s ON o.store_id = s.id";
    db.query(sql, function (err, order) {
      if (err) {
        res.statusCode = 500;
        res.send({ result: err, statusCode: 500, message: err.sqlMessage });
      } else if (order.length === 0) {
        res.statusCode = 404;
        res.send({ result: null, statusCode: 404, message: 'Not Found' });
      } else {
        res.send({ result: order, statusCode: 200, message: 'Ok' });
      }
    });

  });

  app.get('/api/list_orders2/:user_id/:order_status', function (req, res) {
    let user_id = req.params.user_id;
    let order_status = req.params.order_status;
    let sql = "SELECT o.*,u.name as user_name,u.email as user_email,u.phone as user_phone,s.name as store_name FROM orders o JOIN users u ON o.user_id = u.id JOIN store s ON o.store_id = s.id WHERE o.user_id = ? AND o.status = ? ORDER BY o.orderDate DESC";
    db.query(sql,[user_id, order_status], function (err, order) {
      if (err) {
        res.statusCode = 500;
        res.send({ result: err, statusCode: 500, message: err.sqlMessage });
      } else {
        //console.log(req.params.user_id + req.params.order_status);
        res.send({ result: order, statusCode: 200, message: 'Ok ngu' });
      }
    });
  });

  // app.get('/api/list_orderss', function (req, res) {
  //   let sql = "SELECT o.id,o.status,u.name as user_name,u.email as user_email,u.phone as user_phone,s.name as store_name FROM orders o JOIN users u ON o.user_id = u.id JOIN store s ON o.store_id = s.id SELECT o.*,u.name as user_name,u.email as user_email,u.phone as user_phone,s.name as store_name FROM orders o JOIN users u ON o.user_id = u.id JOIN store s ON o.store_id = s.id WHERE o.user_id = 143 AND o.status = 0 ORDER BY o.id DESC";
  //   db.query(sql, function (err, order) {
  //     if (err) {
  //       res.statusCode = 500;
  //       res.send({ result: err, statusCode: 500, message: err.sqlMessage });
  //     } else if (order.length === 0) {
  //       res.statusCode = 404;
  //       res.send({ result: null, statusCode: 404, message: 'Not Found' });
  //     } else {
  //       res.send({ result: order, statusCode: 200, message: 'Ok' });
  //     }
  //   });

  // });

  app.get('/api/list_by_status/:id', function (req, res) {
    let id = req.params.id
    db.query("SELECT o.id,o.orderDate,o.status,u.name as user_name,u.email as user_email,u.phone as user_phone,s.name as store_name FROM orders o JOIN users u ON o.user_id = u.id JOIN store s ON o.store_id = s.id WHERE o.status = ? ", id, function (err, order) {
      if (err) {
        res.statusCode = 500;
        res.send({ result: err, statusCode: 500, message: err.sqlMessage });
      }else {
        res.send({ result: order, statusCode: 200, message: 'Ok' });
      }
    });

  });

  app.get('/api/list_by_id/:id', function (req, res) {
    let id = req.params.id
    db.query("SELECT o.id,o.orderDate,o.note,o.status,o.address,o.detailaddress,o.totalPrice,o.status,u.name as user_name,u.email as user_email,u.phone as user_phone,s.name as store_name FROM orders o JOIN users u ON o.user_id = u.id JOIN store s ON o.store_id = s.id WHERE o.id = ? ", id, function (err, order) {
      if (err) {
        res.statusCode = 500;
        res.send({ result: err, statusCode: 500, message: err.sqlMessage });
      }else {     
        res.send({ result: order, statusCode: 200, message: 'Ok' });
      }
    });

  });

  app.get('/api/list_orderDetail/:id', function (req, res) {
    let id = req.params.id
    db.query("SELECT o.id,o.price,o.quantity,p.name as prod_name,p.image as prod_image FROM order_detail o JOIN products p ON o.product_id = p.id JOIN orders as ord ON ord.id = o.order_id WHERE o.order_id = ? ", id, function (err, orderdetail) {
      if (err) {
        res.send({ result: err, statusCode: 500, message: err.sqlMessage });
      } else if (orderdetail.length === 0) {
        res.send({ result: null, statusCode: 404, message: 'Not Found' });
      } else {
        res.send({ result: orderdetail, statusCode: 200, message: 'Ok' });
      }
    });
  });

  app.get('/api/list_orderDetail2/:id', function (req, res) {
    let id = req.params.id
    db.query("SELECT o.id,o.price,o.quantity,p.sale_price as prod_saleprice,p.price as prod_price,p.name as prod_name,p.image as prod_image FROM order_detail o JOIN products p ON o.product_id = p.id JOIN orders as ord ON ord.id = o.order_id WHERE o.order_id = ? ", id, function (err, orderdetail) {
      if (err) {
        res.send({ result: err, statusCode: 500, message: err.sqlMessage });
      } else if (orderdetail.length === 0) {
        res.send({ result: null, statusCode: 404, message: 'Not Found' });
      } else {
        let data = [];
        orderdetail.forEach(o => {
          o.prod_image = url_link + o.prod_image
          data.push(o)
        });
        res.send({ result: data, statusCode: 200, message: 'Ok' });
      }
    });
  });

  app.put('/api/update-order', function (req, res) {
    db.query("UPDATE orders SET status = ? WHERE id = ?",[req.body.order_status,req.body.order_id] , function (err, results) {
      if (err) {
        res.send({ results: err, statusCode: 500, message: err.sqlMessage });
      } else {
        res.send({results: req.body, statusCode: 200, message: 'Ok' });
      }
    });

  });

}