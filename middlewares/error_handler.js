
function insertErrorHandler(err, req, res, next) {
    console.log("insert error handler");
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

function requiredFieldsValidation(items, next) {
    for (let i = 0; i < items.length; i += 1) {
        if (!items[i]) {
            throw next({ message: "required fields are null", status: 400 });
        }
    }
}
function notFoundHandler(obj, next) {
    if (!obj) {
        throw next({ message: "Not found", status: 404 });
    }
}

let errorHandlers = {
    insertErrorHandler: insertErrorHandler,
    notFoundHandler: notFoundHandler,
    requiredFieldsValidation: requiredFieldsValidation
}
export default errorHandlers = errorHandlers;