const { default: mongoose } = require("mongoose");


const subcategorySchema = new mongoose.Schema({
    name: {
        required: [true, 'not entred'],
        type: String,
        minlength: 3,
        maxlength: 15
    },
    categoryId: {
        required: [true, 'not entred'],
        type: mongoose.Schema.ObjectId,
        ref: 'category'

    },
    createAt: {
        type: Date,
        default: Date.now()
    }
});


const subCategory = mongoose.model('subcategory', subcategorySchema);

module.exports = subCategory;