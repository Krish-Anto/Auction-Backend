const express = require('express')
const router = express.Router()
const itemModel = require('../model/petModel')


router.post("/add-items", async(req,res)=>{
try{
    const insertItems = Array.isArray(req.body)? req.body : [req.body]
    const newItem = await itemModel.insertMany(insertItems)
    
     res.status(201).json({message : "Items added successfully",newItem})
}
catch(error){
    res.status(400).json(error)
}
})

router.get("/get-items",async(req,res)=>{
    try{
        const items = await itemModel.find()
        res.status(201).json(items)
    }
    catch(error){
        res.status(500).json(error)
    }
})

router.post("/delete-items",async(req,res)=>{
    try{
        const item = await itemModel.findOneAndDelete({_id : req.body.id})
        item?res.send("Item deleted successfully") : res.send("item not found")
    }
    catch(error){
        res.status(400).send(error)
    }
})

router.post("/edit-items",async(req,res)=>{
    try{
        await itemModel.findOneAndUpdate({_id:req.body.id},req.body)
        res.send("item updated success")
    }
    catch(error){
        res.status(400).send("items not found")
    }
})


// router.post('/update-item',async(req,res)=>{
//     try{
//         const {id , ...updateData} = req.body
//         const objectId = mongoose.Types.ObjectId.isValid(id) ? mongoose.Types.ObjectId(id) : null;

//     if (!objectId) {
//       return res.status(400).send("Invalid ID format");
//     }
//         const update = await itemModel.findOneAndUpdate({_id : objectId},updateData,{new : true})
//        update ? res.send("item updated successfully") : res.send("item not found")
//     }
//     catch(error){
//        res.status(400).json(error)
//     }
// })



module.exports = router