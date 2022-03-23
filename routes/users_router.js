import express from 'express'
import User from '../database/models/user'
import responseHandler from '../middlewares/response_handler'
import errorHandlers from '../middlewares/error_handler'
import myValidators from '../middlewares/validators'
var router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send({ success: true, users: users })
  } catch (message) {
    return next({ message: message, status: 500 });
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    myValidators.objectIDValidator(req.params.id, next);
    const user = await User.findById(req.params.id);
    errorHandlers.notFoundHandler(user, next);
    res.send({ success: true, user: user });
  } catch (message) {
    return next({ message: message, status: 500 });
  }
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


router.put('/edit:id', async (req, res, next) => {
  // try {
  //   myValidators.objectIDValidator(req.params.id, next);
  //   const user = await User.findById(req.params.id);
  //   errorHandlers.notFoundHandler(user, next);
  //   res.send({ success: true, user: user });
  // } catch (message) {
  //   return next({ message: message, status: 500 });
  // }
  res.send('edit user')
});

router.delete('/delete/:id', async (req, res, next) => {
  try {
    myValidators.objectIDValidator(req.params.id, next);
    const user = await User.findById(req.params.id);
    errorHandlers.notFoundHandler(user, next);
    await user.delete()
    res.send({ success: true});
  } catch (message) {
    return next({ message: message, status: 500 });
  }
})

router.use(responseHandler)
router.use(errorHandlers.insertErrorHandler)

export default router = router;
