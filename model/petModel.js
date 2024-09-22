const mongoose = require('mongoose')


const petSchema = mongoose.Schema({
    name : {type : String, required : true},
    category : {type : String, required : true},
    price : {type : Number,required : true},
    image : {type : String, required : true}
},
{timestamps : true}
);

const petModel = mongoose.model("pets",petSchema)

module.exports = petModel