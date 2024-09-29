const mongoose = require('mongoose')


const billSchema = mongoose.Schema(
    {
        pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet' },
        adopter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
        feedback: String,
    },
    {timestamps : true}
)


const billModel = mongoose.model("bills",billSchema)

module.exports = billModel