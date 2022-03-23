import mongoose from 'mongoose'
import User from '../database/models/user'

function objectIDValidator(id, next) {
    if (!mongoose.Types.ObjectId.isValid(id))
        return next({ message: "ID is not valid ObjectID", status: 400 });
}

function userValidator(body, next) {
    var user = new User(body)
    var error = user.validateSync();

    if (error) {
        return next(error)
    }
    return user
}

let myValidators = {
    objectIDValidator: objectIDValidator,
    userValidator: userValidator
}
export default myValidators = myValidators