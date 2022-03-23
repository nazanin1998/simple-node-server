import express from 'express'
import hash from 'pbkdf2-password'
import User from '../database/models/user'
import responseHandler from '../middlewares/response_handler'
import errorHandlers from '../middlewares/error_handler'
import myValidators from '../middlewares/validators'
import helperFunctions from '../utils/helper_functions'

var router = express.Router();


router.post('/login', async (req, res, next) => {
  try {
    errorHandlers.requiredFieldsValidation([req.body.username, req.body.password], next);
    const matchedUser = await User.findOne({ username: req.body.username });
    errorHandlers.notFoundHandler(matchedUser, next);
    const isValidPassword = await helperFunctions.isValidHash(req.body.password, matchedUser.password);
    if (!isValidPassword) {
      return next({ message: "Wrong password!", status: 400 })
    } else {
      matchedUser.token = helperFunctions.generateJWT({ userId: matchedUser._id })
      await matchedUser.save();
      return next({ data: { token: matchedUser.token }, success: true })
    }
  } catch (message) {
    return next({ message: message, status: 500 })
  }
});

router.use(responseHandler)
router.use(errorHandlers.insertErrorHandler)

export default router = router