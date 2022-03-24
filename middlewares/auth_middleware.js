import JWTHelper from '../utils/jwt_helper'
import User from '../models/user.js'
import AuthRouter from '../routes/auth_router';


async function authenticationMiddleware(req, res, next) {
    let token = req.headers.authorization
    if (!token) {
        return next()
    }
    try {
        const decoded = await JWTHelper.decodeJWT(token);
        const user = await User.findById(decoded.userId);
        if (!user || user.token != token) {
            return next({ message: "token is not valid", status: 403 })
        }
        req.body.user = user;
        next()
    } catch (message) {
        next({ message: message, status: 401 })
    }
}


function authorizationMiddleware(req, res, next) {
    if (!req.body.user) {
        next({ message: "unauthorized", status: 401 })
    } else {
        next()
    }
}

async function refreshTokenMiddleware(data, req, res, next) {
    if (data.status == 200 || data.success) {
        try {
            await new AuthRouter().refreshToken(req.body.user, res);
            return next(data);
        } catch (message) {
            return next({ message: message, status: 500 })
        }
    }
    return next(data);
}

let authMiddleware = {
    authorizationMiddleware: authorizationMiddleware,
    refreshTokenMiddleware: refreshTokenMiddleware,
    authenticationMiddleware: authenticationMiddleware
}
export default authMiddleware = authMiddleware