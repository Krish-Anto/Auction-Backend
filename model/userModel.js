const mongoose = require('mongoose')


const userSchema = mongoose.Schema(
    {
        name :{type : String,required : true},
        userId:{type : String, required : true},
        email:{type : String, unique : true},
        password : {type : String, required : true},
        role : {type : String,required : true,default :"adopter",enum:["admin","adopter","owner"]},
        
    },
    {timestamps : true}
)


const userModel = mongoose.model("users",userSchema)

module.exports = userModel