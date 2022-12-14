const apiFeature = require("../Utils/apiFeature");
const AppError = require("../Utils/appError");
const catchAsync = require("../Utils/catchAsync");
const fs = require('fs');
// const {promisify} = require('util');
// const jwt = require('jsonwebtoken');

exports.craeteModel = (Model, message)=>catchAsync( async(req, res, next)=>{
        console.log(req.body)
        // try{
           const create =  await Model.create(req.body);
            res.status(200).json({
                status: true,
                message: 'با موفقیت انجام شد'
            })
       
            // console.log(doc)
            // <style>.h_iframe-aparat_embed_frame{position:relative;}.h_iframe-aparat_embed_frame .ratio{display:block;width:100%;height:auto;}.h_iframe-aparat_embed_frame iframe{position:absolute;top:0;left:0;width:100%;height:100%;}</style><div class="h_iframe-aparat_embed_frame"><span style="display: block;padding-top: 57%"></span><iframe src="https://www.aparat.com/video/video/embed/videohash/Lphsd/vt/frame" allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe></div>
});

exports.findAllModels = Model =>async(req, res, next)=>{
        // console.log(req.query, await Model.find())
        const feature = new apiFeature( Model.find(), req.query).filters()
        .paginate().sort();
        const data = await feature.data;

        const featureLength = new apiFeature( Model.find(), req.query)
        .filters()
        const dataLength = (await featureLength.data).length;

        res.status(200).json({
            status: true,
            length: dataLength,
            data: data
        })
};

exports.findModelById = Model => catchAsync(async (req, res, next)=>{
        const param = req.params.id;
        // console.log(req.query)
        // let decriptToken ;
        // if(req.query.cookie){
        //     decriptToken = await promisify(jwt.verify)(req.query.cookie + 'dshfuis', process.env.JWT_SECRET_KEY);
        // }
        // console.log(decriptToken)
        const findModel = await Model.findById(param);

        res.status(200).json({
            status: true,
            data: findModel
        })
});

exports.findModelByIdAndUpdate = Model => catchAsync(async (req, res, next)=>{
    const param = req.params.id;
    console.log(req.body)
    const findModel = await Model.findByIdAndUpdate(param,req.body);
    // console.log(Model)
    res.status(200).json({
        status: true,
        data: findModel,
        message: 'به روزرسانی با موفقیت انجام شد'
    })
});

exports.deleteModelById = Model => catchAsync(async (req, res, next)=>{
    const param = req.params.id;
    console.log(param, req.query)
    
    if(req.query.path === 'video'){
        const video = await Model.findById(param);
        fs.existsSync('Public/img/' + video.imageCover) && fs.unlinkSync('Public/img/' + video.imageCover);
    }

    await Model.findByIdAndDelete(param);
    // User.findByIdAndUpdate
    res.status(200).json({
        status: true,
        message: 'با موفقیت حذف شد',
        reload: true
    })
});

