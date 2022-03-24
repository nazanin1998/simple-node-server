export default function responseMiddleware(data, req, res, next) {
    console.log("response middleware");
    
    res.locals.message = data.message;
    res.locals.error = req.app.get('env') === 'development' ? data : {};

    if(!data.message){
      data.status = 200
    }

    res.status(data.status || 500);
    res.send({
      'status': data.status || 500,
      'message': res.locals.message,
      "data": data.data,
      "success": data.success || (data.status == 200)
    });
}