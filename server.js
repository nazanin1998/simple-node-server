var app = require('./app').app;
var http = require('http');

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
app.set('address', '10.10.10.10');

var server = http.createServer(app);
server.listen(port);
server.on('listening', onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}


function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}
