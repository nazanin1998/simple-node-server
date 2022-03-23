import mongoose from 'mongoose'

function objectIDValidator(id, next) {
    if (!mongoose.Types.ObjectId.isValid(id))
        return next({ message: "ID is not valid ObjectID", status: 400 });
}
let myValidators = {
    objectIDValidator : objectIDValidator
}
export default myValidators = myValidators