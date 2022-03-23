import express from 'express'
import User from '../database/models/user'
import responseHandler from '../middlewares/response_handler'
import errorHandlers from '../middlewares/error_handler'
import myValidators from '../middlewares/validators'
var router = express.Router();


router.put('/edit/:id', async (req, res, next) => {
  try {
    myValidators.objectIDValidator(req.params.id, next);
    const oldUser = await User.findById(req.params.id);
    errorHandlers.notFoundHandler(oldUser, next);
    let newUser = Object.assign(oldUser, req.body)
    newUser.save((error, data) => {
      if (error) {
        next(error)
        return;
      }
      next({ success: true })
    })
  } catch (message) {
    return next({ status: 500, message: message });
  }
});

router.delete('/delete/:id', async (req, res, next) => {
  try {
    myValidators.objectIDValidator(req.params.id, next);
    const user = await User.findById(req.params.id);
    errorHandlers.notFoundHandler(user, next);
    await user.delete()
    next({ success: true })
  } catch (message) {
    return next({ message: message, status: 500 });
  }
})

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find({});
    next({ success: true, data: users })
  } catch (message) {
    return next({ message: message, status: 500 });
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    myValidators.objectIDValidator(req.params.id, next);
    const user = await User.findById(req.params.id);
    errorHandlers.notFoundHandler(user, next);
    next({ success: true, data: user })
  } catch (message) {
    return next({ message: message, status: 500 });
  }
});


router.post('/register', function (req, res, next) {
  const user = myValidators.userValidator(req.body, next)

  User.collection.insertOne(user, { runValidators: true }, function (err, user) {
    if (err) {
      next(err)
    } else {
      next({ success: true, data: user });
    }
  });
});


router.use(responseHandler)
router.use(errorHandlers.insertErrorHandler)

export default router = router;
