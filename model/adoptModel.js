const mongoose = require('mongoose')


const AdoptSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: Number, required:true },
        details : {type:String,required:true},
        petId: { type: mongoose.Schema.Types.ObjectId, ref: 'petModel', required: true }
    },
    {timestamps : true}
)


const AdoptModel = mongoose.model("adoptForm",AdoptSchema)

module.exports = AdoptModel