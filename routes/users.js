import express from 'express'
var router = express.Router();

router.get('/', function(req, res) {
  users = [
    {name: "bb"},
    {name: "bb2"},
    {name: "bb3"},
  ]
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

router.post('/new', function(req, res) {
  res.send('new user');
});

router.put('/edit', function(req, res) {
  res.send('edit user')
});

router.delete('/delete', function(req, res) {
  res.send('delete user')
})
export default router = router;
