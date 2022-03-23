import helperFunctions from '../utils/helper_functions'
import errorHandler from '../middlewares/error_handler'
import User from '../database/models/user.js'
import e from 'express';

function authenticationMiddleware(req, res, next) {
    const token = req.headers.token

    if (token) {
        try {
            helperFunctions.decodeJWT(token, async (err, decoded) => {
                if (err) {
                    return next({ message: err.message, status: 401 })
                }
                const user = await User.findById(decoded.userId);
                if (!user) {
                    next({ message: "user not exist", status: 401 })
                }
                req.user = user
            });
        } catch (message) {
            next({ message: message })
        }
    }
    next()
}

export default authenticationMiddleware = authenticationMiddleware