import mongoose from 'mongoose'
import User from '../models/user'

function objectIDValidator(id, next) {
    if (!mongoose.Types.ObjectId.isValid(id))
        return next({ message: "ID is not valid ObjectID", status: 400 });
}

function userValidator(body, next) {
    var user = new User(body)
    var error = user.validateSync();

    if (error) {
        return next({ message: error, status: 400 });
    }
    return user
}

function requiredFieldsValidator(items, next) {
    for (let i = 0; i < items.length; i += 1) {
        if (!items[i]) {
            throw next({ message: "required fields are null", status: 400 });
        }
    }
}

function notFoundValiadtor(obj, next) {
    if (!obj) {
        throw next({ message: "Not found", status: 404 });
    }
}

function insertValidator(err, req, res, next) {
    console.log("insert error middleware");
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

let validatorMiddlewares = {
    objectIDValidator: objectIDValidator,
    userValidator: userValidator,
    notFoundValiadtor: notFoundValiadtor,
    requiredFieldsValidator: requiredFieldsValidator,
    insertValidator: insertValidator
}
export default validatorMiddlewares = validatorMiddlewares