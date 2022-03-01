"use strict";

var _app = _interopRequireDefault(require("./app.js"));

var _http = _interopRequireDefault(require("http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = normalizePort(process.env.PORT || '3000');

_app.default.set('port', port);

_app.default.set('address', '10.10.10.10');

var server = _http.default.createServer(_app.default);

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
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
//# sourceMappingURL=server.js.map