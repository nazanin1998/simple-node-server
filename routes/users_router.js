import express from 'express'
import User from '../database/models/user'
var router = express.Router();

router.get('/', function (req, res) {
  User.find({}, function (err, users) {
    if (err) return handleError(err);
    res.send({ success: true, users: users })
  });
});

router.post('/register', function (req, res, next) {
  var user = new User(req.body)
  var error = user.validateSync();

  if (error) {
    next(error)
    return;
  }

  User.collection.insertOne(user, { runValidators: true }, function (err, data) {
    if (err) {
      next(err)
    } else {
      res.success = true
      res.data = data
      next(res)
    }
  });
});


router.put('/edit', function (req, res) {
  res.send('edit user')
});

router.delete('/delete', function (req, res) {
  res.send('delete user')
})

function userErrorHandler(err, req, res, next) {
  console.log("user error handler");
  if (err.errors) {
    let error = {};
    const keys = Object.keys(err.errors);

    keys.forEach((key) => {
      let message = err.errors[key].message;
      if (err.errors[key].properties && err.errors[key].properties.message) {
        message = err.errors[key].properties.message.replace('`{PATH}`', key);
      }
      message = message.replace('Path ', '').trim();
      error[key] = message;
    });
    next({
      message: error,
      status: 400
    })
  } if (err.code === 11000) {
    var duplicateValue = err.message.match(/".*"/);
    next({
      message: duplicateValue[0] + " Is Already Exsist !",
      status: 400
    })
  } else {
    next(err);
  }
};

function responseHandler(response, req, res, next) {
  if (response.success) {
    next({
      success: true,
      status: 200,
      data: response.data
    })
  }
  next(response)
}
router.use(responseHandler)

router.use(userErrorHandler)


export default router = router;
