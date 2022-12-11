module.exports = (err, req, res, next) => {

    console.log(req.method);
    if(req.method === "POST"){
    res.status(200).json({
        message: 'انجام نشد'
    })
    }else{
        res.status(200).json({
            status: false
        })
    }
    throw('error')
    // if()
}