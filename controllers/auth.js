const crypto = require('crypto')
const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')
const sendMail = require('../utils/sendEmail')
const register = async (req, res, next) =>{
    const {username, email, password} = req.body
    try {
        const user = await User.create({username, email, password,})
        const token = await user.generateAuthToken()
        res.status(201).send({
            success: true,
            token
        })
    } catch (error) {
        next(error)     
    }
}
const login = async (req, res, next) =>{
    const { email, password } = req.body
    try {
        if( !email || !password ){
            return next(new ErrorResponse("Please provide email and password", 400))
        }
        const user = await User.findOne({email}).select("+password")
        if(!user){
            return next(new ErrorResponse("Unable to login!", 401))
        }
        const isMatch = await user.matchPasswords(password)
        if(!isMatch){
            return next(new ErrorResponse("Unable to login!", 401))
        }
        token = await user.generateAuthToken();
        res.status(200).json({success: true, token})
    } catch (error) {
        next(error)
    }
}
const logout = (req, res, next) =>{
    res.send('Logout route')
}
const forgotpassword = async (req, res, next) =>{
    const {email} = req.body
    try {
        const user = await User.findOne({email})
        if(!user){
            return next(new ErrorResponse('Email could not be sent!', 402))
        }
        const resetToken = user.generatePasswordResetToken()
        console.log(resetToken)
        await user.save()
        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`
        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please click the following link or copy and paste it to your web browser. <a href="${resetUrl}" clicktracking=off>${resetUrl}</a> to reset your password. The password reset link is valid for next 10 minutes!</p>
        `;
        try{
            await sendMail({
                to: user.email,
                subject: 'Reset Password Request',
                body: message
            })
            res.status(200).json({success: true, data: 'Email has been sent!'})
            
        }catch(e){
            user.resetpasswordToken = undefined
            user.resetpasswordExpire = undefined
            await user.save()
            next(e)
        }
    } catch (error) {
        next(error)
    }
}
const resetpassword = async(req, res, next) =>{
    const resetpasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex")
    // console.log(resetpasswordTtoken)
    try {
        const user = await User.findOne({resetpasswordToken, resetpasswordExpire: {$gt: Date.now()}})
        if(!user){
            next(new ErrorResponse('Invalid password reset token!', 401))
        }
        // console.log(user)
        user.password = req.body.password
        user.resetpasswordToken = undefined
        user.resetpasswordExpire = undefined
        await user.save()
        res.status(201).json({success: true, data: 'Password has been updated!'})
    } catch (error) {
        next(error)
    }
}
module.exports = {register, login, logout, forgotpassword, resetpassword}