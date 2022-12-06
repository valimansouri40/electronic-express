const Order = require('../Models/orderModel');
const catchAsync  = require('../Utils/catchAsync');
const factory = require('./factoryHandller');

exports.createOrder = factory.craeteModel(Order,'قبلا سفارش شما ثبت شده');
exports.getAllOrder = factory.findAllModels(Order);
exports.getOneOrder = catchAsync(async(req, res, next)=>{
        const videoId = req.query.videoId;
        const UserId = req.user._id;
        console.log(videoId, UserId)
        let order;
        if(videoId && UserId){
            order = await Order.findOne({UserId: UserId, videoId: videoId});
        }
        res.status(200).json({
            status: true,
            data: order?order:[]
        })
});
exports.updateOrder = factory.findModelByIdAndUpdate(Order);
exports.deleteOrder = factory.deleteModelById(Order);

