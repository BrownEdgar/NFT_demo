require('dotenv').config()
require('./configs/passport_config')
var cors = require('cors')
const passport = require('passport');
const expressSession = require('express-session');


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

const UserController = require('./controllers/UsersController');
const controller = new UserController()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(expressSession({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(passport.initialize());
app.use(passport.session());

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

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.get('/failed', (req, res) => {
  res.send('Login Error')
})

app.get('/success', isLogin, (req, res) => {
  console.log(`success`, req.session.user)
  const username = req.session.user.displayName;
  const photo = req.session.user.photos[0].value;
  res.json({ username, photo })
})


app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/failed',
  }),
  controller.signUp);


function isLogin(req, res, next) {
  console.log("req.session.user ------------------> ", req.session.user);
  req.session.user ? next() : res.sendStatus(401);
}

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
