import path from 'path'
import { fileURLToPath } from 'url';
import logger from 'morgan'
import express from 'express'
import createError from 'http-errors'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import indexRouter from './routes/index.js'
import usersRouter from './routes/users_router.js'
import authRouter from './routes/auth_router.js'
import authenticationMiddleware from './middlewares/auth_middleware'
import dotenv from 'dotenv'

dotenv.config()
var app = express();

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

app.use(authenticationMiddleware)

/*
routers
*/
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'files')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

/*
catch 404 and forward to error handler
*/
app.use(function (req, res, next) {
  next(createError(404));
});

/*
error handler
*/
app.use(function (result, req, res, next) {

  res.locals.message = result.message;
  res.locals.error = req.app.get('env') === 'development' ? result : {};

  res.status(result.status || 500);
  res.send({
    'status': result.status || 500,
    'message': res.locals.message,
    "data": result.data,
    "success": result.success || (result.status == 200)
  });
});
export default app = app