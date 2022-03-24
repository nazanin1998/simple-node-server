import express from 'express'
import User from '../models/user'
import validatorMiddlewares from '../middlewares/validator_middlewares'
import helperFunctions from '../utils/helper_functions'
import authMiddleware from '../middlewares/auth_middleware';
import { token } from 'morgan';

export default class UserRouter {
  constructor() {
    this.router = express.Router();
    this.router.use(authMiddleware.authorizationMiddleware);
    this.router.get('/', async (req, res, next) => {
      this.findAll(req, res, next)
    });
    this.router.get('/:id', async (req, res, next) => {
      this.findOne(req, res, next)
    });
    this.router.put('/edit', async (req, res, next) => {
      this.editOne(req, res, next)
    });
    this.router.delete('/delete', async (req, res, next) => {
      this.deleteOne(req, res, next)
    });
    this.router.use(validatorMiddlewares.insertValidator)
    this.router.use(authMiddleware.refreshTokenMiddleware)
  }

  async findAll(req, res, next) {
    try {
      const users = await User.find({}, { token: 0 });
      next({ success: true, data: users })
    } catch (message) {
      return next({ message: message, status: 500 });
    }
  }
  async findOne(req, res, next) {
    try {
      validatorMiddlewares.objectIDValidator(req.params.id, next);
      const user = await User.findById(req.params.id,{ token: 0 });
      validatorMiddlewares.notFoundValiadtor(user, next);
      next({ success: true, data: user })
    } catch (message) {
      return next({ message: message, status: 500 });
    }
  }

  async editOne(req, res, next) {
    try {
      const userId = req.body.user.id
      console.log(userId)
      validatorMiddlewares.objectIDValidator(userId, next)
      const oldUser = await User.findById(userId)
      validatorMiddlewares.notFoundValiadtor(oldUser, next)
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
  }

  async deleteOne(req, res, next) {
    try {
      insertValidator.objectIDValidator(req.params.id, next);
      const user = await User.findById(req.params.id);
      insertValidator.notFoundValiadtor(user, next);
      await user.delete()
      next({ success: true })
    } catch (message) {
      return next({ message: message, status: 500 });
    }
  }
};
