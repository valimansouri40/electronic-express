exports.catchAsync= (dt)=>{
  return (req,res,next)=>{
        dt(req,res,next).catch(()=>{
          res.status(200).json({
            // message: 'not valid token',
            error: true
          })
        })
  }
}