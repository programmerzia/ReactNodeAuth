const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true}, (error)=>{
    if(!error){
        console.log('connected to database')
    }else{
        console.log('database connection failed!')
    }
})