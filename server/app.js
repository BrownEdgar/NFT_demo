require('dotenv').config()
var cors = require('cors')
var jwt = require('jsonwebtoken')

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var UserService = require('../server/services/UserService');
var ProductsService = require('../server/services/ProductsService');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');

var app = express();
const db = require('./utils/connection')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.models = {
  users: db.models.users,
  products: db.models.products,
}

app.services = {
  users: new UserService(app.models),
  products: new ProductsService(app.models),
}

const checkToken = (req, res, next) => {
  const token = req?.headers['authorization']

  if (!token) {
    res.json("no token")
    return;
  } else {
    console.log(2222)
    try {
      const isValid = jwt.verify(token, process.env.SECRET_TOKEN);
      console.log("isValid", isValid);
      next()
    } catch (error) {
      res.status(500).json({ message: 'invalid token' });
    }

  }

}
app.use(checkToken)
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/products', productsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
