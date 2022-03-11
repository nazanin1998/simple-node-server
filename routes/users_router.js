import e from 'express';
import express from 'express'
import User from '../database/models/user'
var router = express.Router();

router.get('/', function (req, res) {
  User.find({}, 'firstName lastName username', function (err, users) {
    if (err) return handleError(err);
    res.send({ success: true, users: users })
  });
});

router.post('/register', mongooseErrorHandler, function (req, res, next) {
  var user = new User(req.body)
  var error = user.validateSync();

  if (error) {
    next(error)
  }
  //  error

  // res.status(400).send({ success: false, err: error, errType: error.name })
  // assert.equal(error.errors['eggs'].message,
  //   'Must be at least 6, got 2');
  // assert.equal(error.errors['drink'].message, 'Milk is not supported');
  // User.collection.insertOne(user, { runValidators: true }, function (err, docs) {
  //   if (err) {
  //     console.log("reee")
  //     res.status(400).send({ success: false, err: err, errType: err.name })
  //   } else {
  //     res.send({ success: true, docs: docs })
  //   }
  // });
});

function mongooseErrorHandler(err, req, res, next) {

  if (err.errors) {
    const error = {};
    const keys = Object.keys(err.errors);

    keys.forEach((key) => {
      let message = err.errors[key].message;

      //   // if (err.errors[key].properties && err.errors[key].properties.message) {
      message = err.errors[key].properties.message;
      console.log("ddsd")

      console.log(message)
       //   // }

      //   if(key == 'message'){
      //     error[key] = message
      //   }
      //   // message = message.replace('Path ', '').replace(key, '').trim();
      //   // error[key] = message;
    });


    return res.status(500).json({
      error: message
    }); // or return next(error);
    next();
  }

};

router.put('/edit', function (req, res) {
  res.send('edit user')
});

router.delete('/delete', function (req, res) {
  res.send('delete user')
})
export default router = router;
