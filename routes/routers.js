var path = require('path');
var indexRouter = require('./index');
var usersRouter = require('./users');
var authRouter = require('./auth');
var appFile = require('../app');
var app = appFile.app;
var express = appFile.express;

console.log(typeof(app))
console.log(appFile)
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'files')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

module.exports = app