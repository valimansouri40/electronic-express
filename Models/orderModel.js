const { default: mongoose } = require("mongoose");


const OrderSchema = new mongoose.Schema({
        UserId:{
            type: mongoose.Schema.ObjectId,
            ref: 'userrr',
            required: [true, 'not entred']
        },
        videoId:{
            type: mongoose.Schema.ObjectId,
            ref: 'video',
            required: [true, 'not entred']
        },
        price:{
             type:Number,
             required: [true, 'not entred'] 
        },
        paid:{
            type: String,
            //  required: [true, 'not entred'],
             enum: ['paid', 'unpaid'],
             default:'paid'
        },
        craeteAt:{
            type: Date,
            default: Date.now()
        },
})

OrderSchema.pre(/^find/, function(next){
        this.populate({
            path:'videoId',
            select:'title _id description price imageCover'    
        });
        next();
})

const Order = mongoose.model('order', OrderSchema);

module.exports = Order;