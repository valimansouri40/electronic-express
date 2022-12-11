const sharp = require('sharp');
const Category = require('../Models/CategoryModel');
const Video = require('../Models/videoModels');
const catchAsync = require('../Utils/catchAsync');
const factory = require('./factoryHandller');


exports.resizeAndSaveImage = catchAsync(async (req, res ,next)=>{
    req.body.categoryName = (await Category.findById(req.body.categoryId)).name;
    
    if(!req.body.imageCover?.startsWith('data:image/')) return next();
        
        const imageCover = req.body.imageCover.split(';base64,').pop();
        const convertTobuffer = Buffer.from(imageCover, 'base64');
        // delete req.body.imageCover
        // console.log(convertTobuffer)
        const fileName = `${Date.now() * 1 }-${req.body.title}.jpeg` 
         
        await sharp(convertTobuffer).resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({quality:90})
        .toFile(`Public/img/${fileName}`).then(res=>console.log('success'));

        req.body.imageCover = fileName;
        // console.log(JSON.stringify(req.body), 'vali man')

    
    next();
})

exports.createVideo = catchAsync(async(req,res,next)=>{
    const create =  await Model.create(req.body).catch(er=>{
        return next(new AppError('Incorrect email or password', 200));
        //    throw('error')
       });
        res.status(200).json({
            status: true,
            message: 'با موفقیت انجام شد'
        })
});
exports.getAllVideo = factory.findAllModels(Video);
exports.getVideoById = factory.findModelById(Video);
exports.updateVideoById = factory.findModelByIdAndUpdate(Video);
exports.deleteVideoById = factory.deleteModelById(Video);

