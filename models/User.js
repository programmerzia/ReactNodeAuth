const crypto = require('crypto')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Please provide a username']
    },
    email:{
        type: String,
        unique: true,
        required: [true, 'Please provide a email'],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Pleaes provide a valid email')
            }
        }
    },
    password:{
        type: String,
        minlength: 6,
        select: false
    },
    resetpasswordToken:{
        type: String
    },
    resetpasswordExpire:{
        type: Date
    }
},{timestamps: true})


userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next()
})

userSchema.methods.matchPasswords = async function(password){
    return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = await jwt.sign({_id: user._id.toString()}, process.env.SECRET_KEY, {expiresIn: process.env.TOKEN_EXPIRES})
    return token
}

userSchema.methods.generatePasswordResetToken = function() {
    const resetToken = crypto.randomBytes(64).toString("hex")
    this.resetpasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.resetpasswordExpire = Date.now() + 10 * (60 * 1000)
    return resetToken;
}
const User = mongoose.model('user',userSchema)

module.exports = User