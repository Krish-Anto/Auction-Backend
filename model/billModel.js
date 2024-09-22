const mongoose = require('mongoose')


const billSchema = mongoose.Schema(
    {
        Customername :{type : String,required : true},
        MobileNumber :{type:Number,required : true},
        tax:{type : Number, required : true},
        TotalAmount : {type : Number, required : true},
        SubTotal : {type : String, required : true},
        PaymentMode : {type : String, required : true},
        cartItems : {type : Array,required : true}
    },
    {timestamps : true}
)


const billModel = mongoose.model("bills",billSchema)

module.exports = billModel