const mongoose = require('mongoose')
const userModel = require('./userModel')

const petSchema = mongoose.Schema({
    name : {type : String, required : true},
    breed : {type : String, required : true},
    gender :{type : String, required : true,enum: ['Male', 'Female']},
    details:{type : String, required : true},
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel',required : true },
    image : {type : String, required : true}
},
{timestamps : true}
);

const petModel = mongoose.model("pets",petSchema)

module.exports = petModel