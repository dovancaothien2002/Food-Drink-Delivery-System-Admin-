const express = require('express');
const multer = require('multer');
// const {conn, sql} = require('connect');
var bodyparser = require('body-parser');
const app = express();
const ejs = require('ejs');
ejs.delimiter = '?';
app.set('view engine', 'html');
app.engine('html', ejs.__express);
app.set('views', './app/views');
app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const PORT = 3333;
app.get('/', (req, res) => {
    res.render('home')
});
// Cross-Origin
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
  });
app.use(function (req, res, next) {
    require('./app/router/category.router')(app);
    require('./app/router/product.router')(app);
    require('./app/router/category.api.router')(app);
    require('./app/router/product.api.router')(app);
    require('./app/router/account.api.router')(app);
    require('./app/router/user.api.router')(app);
    require('./app/router/store.api.router')(app);
    require('./app/router/order.api.router')(app);
    require('./app/router/deliveryaddress.api.router')(app);
    next();
})
app.listen(PORT, function () {
    console.log('serve run on http://localhost:' + PORT);
})