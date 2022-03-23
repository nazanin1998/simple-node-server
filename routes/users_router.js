import express from 'express'
import User from '../database/models/user'
import responseHandler from '../middlewares/response_handler'
import errorHandlers from '../middlewares/error_handler'
import myValidators from '../middlewares/validators'
import helperFunctions from '../utils/helper_functions'
var router = express.Router();


router.put('/edit/:id', async (req, res, next) => {
  try {
    myValidators.objectIDValidator(req.params.id, next)
    const oldUser = await User.findById(req.params.id)
    errorHandlers.notFoundHandler(oldUser, next)
    req.body = User.Helpers.deleteFieldsOnEdit(req.body)

    let newUser = Object.assign(oldUser, req.body)

    newUser.save((error, data) => {
      if (error) {
        return next(error)
      }
      next({ success: true })
    })
  } catch (message) {
    return next({ status: 500, message: message })
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


router.post('/register', async (req, res, next) => {
  try {
    req.body = User.Helpers.deleteFieldsOnInsert(req.body)
    const user = myValidators.userValidator(req.body, next)

    user.password = await helperFunctions.convertStrToHash(user.password)
    User.collection.insertOne(user, { runValidators: true }, function (err, user) {
      if (err) {
        next(err)
      } else {
        next({ success: true, data: user });
      }
    });
  } catch (message) {
    return next({ message: message, status: 500 });
  }

});

router.use(responseHandler)
router.use(errorHandlers.insertErrorHandler)

export default router = router;
