const {catchAsync} = require("../Utils/catchAsync");
const User =require('../Models/UserModels');
const jwt = require('jsonwebtoken');
const {promisify} = require('util')

const createJwtToken = (id)=> jwt.sign({id}, process.env.JWT_SECRET_KEY,
    { 
        expiresIn: process.env.EXPIRES_JWT
    });

const createANDSendJWTToken = (user, res, status, message)=>{
           const Token = createJwtToken(user._id);
            // console.log(Token)
            res.status(status).json({
                status: true,
                message: message,
                token: Token
            })
}

exports.CreateUser = catchAsync(async(req, res, next)=>{

    const userLng = 0
    
    if(userLng === 0){
        req.body.role = 'admin'
    }else{
        req.body.role = 'user'
        
    }
    const user = await User.create(req.body);


    createANDSendJWTToken(user, res ,201 , 'حساب با موفقیت ایجاد شد', )

})


exports.Login = catchAsync(async(req, res)=>{
   
    const {email, password, name} = req.body;
    // console.log(req.body)
    if( !email || !password ) throw('not entred el'); 
    // await User.findOneAndUpdate({email: email}, {role:'admin'})
    
    const existUser = await User.findOne({email: email}).select('password');
    
    if(!existUser){
        res.status(200).json({
            message: 'این ایمیل ثبت نشده است',
            status: false
        });
        throw('not exist user email in database');
        
    }
    // console.log(existUser)
    if(!(await existUser.compirePass(password, existUser.password))){
        res.status(200).json({
            message: 'پسوورد وارد شده صحیح نمی باشد',
            status: false
        });
        throw('not exist user email in database');
        
    }

    createANDSendJWTToken(existUser, res, 200,'با موفقیت به حساب وارد شدید', ) 
});


exports.Protected = catchAsync(async(req, res, next)=>{
        let token;
        // ''.startsWith
        // console.log(req.headers.authorization)
        if(req.headers.authorization && 
            req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1]
        }

        if(!token) throw('not exist token');

        const decriptToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);

        if(!decriptToken) throw('invalid token!!');

        const user = await User.findById(decriptToken.id);

        if(!user) throw('there is no such user');

        req.user = user;
        next();
})


exports.ResterictTo = role => catchAsync((req, res, next)=>{

            // console.log(req.user, role);
            if(role !== req.user.role){
                throw('you are not an admin');
            }

            next();
});

exports.getUserData = catchAsync((req, res)=>{

        res.status(200).json({
            status: true,
            data: req.user
        })
})