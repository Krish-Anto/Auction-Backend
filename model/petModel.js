const mongoose = require('mongoose')


const petSchema = mongoose.Schema({
    name : {type : String, required : true},
    breed : {type : String, required : true},
    details:{type : String, required : true},
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel' },
    image : {type : String, required : true}
},
{timestamps : true}
);

const petModel = mongoose.model("pets",petSchema)

module.exports = petModel