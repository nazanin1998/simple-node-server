import path from 'path'
import { fileURLToPath } from 'url';
import logger from 'morgan'
import express from 'express'
import createError from 'http-errors'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import UserRouter from './routes/users_router.js'
import AuthRouter from './routes/auth_router.js'
import authMiddleware from './middlewares/auth_middleware'
import responseMiddleware from './middlewares/response_middleware'
import dotenv from 'dotenv'

dotenv.config()
var app = express();
print("bab")
/*
view engine setup
*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view engine', 'pug');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

/*
middlewares
*/
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'shhhh, very secret'
}));

app.use(function (req, res, next) {
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
  next();
});

app.use(authMiddleware.authenticationMiddleware)

/*
routers
*/
app.use('/static', express.static(path.join(__dirname, 'public')));


// app.use('/', indexRouter);
app.use('/users', new UserRouter().router);
app.use('/auth', new AuthRouter().router);

/*
catch 404 and forward to error handler
*/
app.use(function (req, res, next) {
  next(createError(404));
});

/*
error handler
*/
app.use(responseMiddleware);
export default app = app