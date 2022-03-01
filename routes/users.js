var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.format({
    html: function(){
      res.send('<ul>' + users.map(function(user){
        return '<li>' + user.name + '</li>';
      }).join('') + '</ul>');
    },

    text: function(){
      res.send(users.map(function(user){
        return ' - ' + user.name + '\n';
      }).join(''));
    },

    json: function(){
      res.json(users);
    }
  });
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
