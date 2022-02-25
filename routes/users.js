var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('users list');
});

router.post('/new', function(req, res, next) {
  res.send('new user');
});

router.put('/edit', function(req, res, next) {
  res.send('edit user')
});

router.delete('/delete', function(req, res, next) {
  res.send('delete user')
})
module.exports = router;
