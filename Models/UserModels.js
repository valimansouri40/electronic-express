const mongoose = require('mongoose');
// const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    name:{
        required: [true, 'not entred'],
        type: String,
        minlength: 3,
        maxlength: 50
    },
    email:{
        required: [true, 'not entred'],
        type: String,
        unique: true,
        minlength: 3,
        maxlength: 50,
        validate: [validator.isEmail, 'ther is no email format!!']
    },
    role:{
        required: [true, 'not entred'],
        type: String,
        enum: ['admin', 'user']
    },
    password:{
        type: String,
        minlength: 3,
        maxlength: 50,
        required:[true, 'not entred'],
        select: true
    },
    passwordConfirm:{
        type: String,
        minlength: 3,
        maxlength: 50,
        required:[true, 'not entred'],
        validate: {
            // This only works on CREATE and SAVE!!!
            validator: function(el) {
              return el === this.password;
            },
            message: 'Passwords are not the same!'
          }
    },
    createAt:{
        type: Date,
        default: Date.now()
    },
});

UserSchema.pre('save', async function(next){
    // if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12); 
    this.passwordConfirm = undefined;
    next();

})

UserSchema.methods.compirePass = async function(inpPass, hashPass){
    return await bcrypt.compare(inpPass, hashPass)
}



const User = mongoose.model('userrr', UserSchema);

module.exports = User;
