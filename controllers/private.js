const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/User')
exports.getPrivateData = (req, res, next)=>{
    res.status(200).json({
        status: true,
        message: 'You have access to this private data'
    })
}
exports.getAllUser = (req, res, next) => {
    try {
        const users = User.find({})
        if(!users){
            next(new ErrorResponse('No users found!', 402))
        }
        res.status(200).send(users)
    } catch (error) {
        next(new ErrorResponse(error.message, 500))
    }
}