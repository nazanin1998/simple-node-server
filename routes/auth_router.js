import express from 'express'
import User from '../models/user'
import validatorMiddlewares from '../middlewares/validator_middlewares'
import helperFunctions from '../utils/helper_functions'
import JWTHelper from '../utils/jwt_helper'
export default class AuthRouter {
  constructor() {

    this.router = express.Router();

    this.router.post('/register', async (req, res, next) => {
      this.register(req, res, next)
    });
    this.router.post('/login', async (req, res, next) => {
      this.login(req, res, next)
    });

    this.router.use(validatorMiddlewares.insertValidator)
  }

  async login(req, res, next) {
    try {
      validatorMiddlewares.requiredFieldsValidator([req.body.username, req.body.password], next);
      const matchedUser = await User.findOne({ username: req.body.username });
      validatorMiddlewares.notFoundValiadtor(matchedUser, next);
      const isValidPassword = await helperFunctions.isValidHash(req.body.password, matchedUser.password);
      if (!isValidPassword) {
        return next({ message: "Wrong password!", status: 400 })
      } else {
        await this.refreshToken(matchedUser, res)
        return next({ success: true })
      }
    } catch (message) {
      return next({ message: message, status: 500 })
    }
  }

  async refreshToken(user, res){
    user.token = JWTHelper.generateJWT({ userId: user._id })
    await user.save();
    res.set("Authorization", user.token)
  }

  async register(req, res, next) {
    try {
      req.body = User.Helpers.deleteFieldsOnInsert(req.body)
      const user = insertValidator.userValidator(req.body, next)

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
  }
}
