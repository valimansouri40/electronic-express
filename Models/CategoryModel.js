const { default: mongoose } = require("mongoose");


const categorySchema = new mongoose.Schema({
    name: {
        required: [true, 'not entred'],
        type: String,
        minlength: 3,
        maxlength: 15,
        unique: true
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
});


const Category = mongoose.model('category', categorySchema);

module.exports = Category;