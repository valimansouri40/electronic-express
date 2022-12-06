const { default: mongoose } = require("mongoose");


const videoSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'not enterd'],
        minlength: 3,
        maxlength: 50,
        unique: true
    },
    description:{
        type: String,
        required: [true, 'not enterd'],
        minlength: 3,
        maxlength: 350
    },
    price:{
        type: Number,
        default: 0
    },
    salesNumber:{
        type: Number,
    },
    rate:{
        type: Number,
        default: 4.5,
        max: [5, 'grater than 5'],
        min: [1, 'letter than 1 ']
    },
    categoryId:{
        type: mongoose.Schema.ObjectId,
        ref: 'category'
    },
    categoryName:{
        type: String,
        // ref: 'category',
        required: [true, 'not entred']
    },
    ratingsQuantity: {
        type: Number,
        default: 0
      },
    imageCover:{
        type: String
    },
    links:{
        type: Array,
        required: [true, 'not enterd']       
    },
    status:{
        type: String,
        required: [true, 'not enterd'],
        enum:['free', 'money']
        },
    createAt:{
        type: Date,
        default: Date.now()
    }
});

// videoSchema.pre(/^find/, function(next){
//     // this.populate({
//     //     ref:'categoryId',
//     //     select: 'name categoryId _id'
//     // });
//     next();
// })

const Video = mongoose.model('video', videoSchema);

module.exports = Video;

