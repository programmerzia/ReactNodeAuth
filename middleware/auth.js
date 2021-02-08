const jwt = require('jsonwebtoken');
const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')

exports.protect = async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(" ")[1]
    }
    if(!token){
        return next(new ErrorResponse("Unauthorized access detected!", 401))
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    const user = User.findById({_id: decoded._id})
    if(!user){
        return next(new ErrorResponse("You are not allowed here. Unauthorized access!", 401))
    }

    req.user = user

    next()
}