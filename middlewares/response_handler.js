export default function responseHandler(response, req, res, next) {
    console.log("response handler");
    if (response.success) {
        next({
            success: true,
            status: 200,
            data: response.data
        })
    }
    next(response)
}