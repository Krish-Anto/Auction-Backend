const express = require('express')
const router = express.Router()
const petModel = require('../model/petModel')
// const multer = require('multer')
const auth = require('../Middleware/Auth')
const authorizeRoles = require('../Middleware/Authorize')


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // Directory for uploaded files
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname); // Unique file name
//     }
// });
// const upload = multer({ storage: storage });

// router.post("/add-pets", async(req,res)=>{
// try{
//     const insertItems = Array.isArray(req.body)? req.body : [req.body]
//     const newItem = await petModel.insertMany(insertItems)
    
//      res.status(201).json({message : "Items added successfully",newItem})
// }
// catch(error){
//     res.status(400).json(error)
// }
// })

router.post('/addpets',auth,authorizeRoles('owner','admin'), async (req, res) => {
    // const { name, breed, gender,details,image } = req.body;
    
    try {
        const ownerId = req.user.id; 
        const { name, breed, gender,details, image } = req.body;
        const newPet = new petModel({
            name,
            breed,
            gender,
            details,
            image,
            owner: ownerId,
            verified : true});
        await newPet.save();
        res.status(201).json({ message: 'Pet added successfully' });
    } catch (error) {
        console.error('Error adding pet:', error);
        res.status(500).json({ message: 'Failed to add pet', error: error.message });
    }
});

router.get("/get-pets",auth,async(req,res)=>{
    
    try{
        const items = await petModel.find()
        res.status(201).json(items)
    }
    catch(error){
        res.status(500).json(error)
    }
})

router.post("/delete-pet/:petId",auth,authorizeRoles('owner','admin'),async(req,res)=>{
    const  petId  = req.params.id;
    const userId = req.user.id;
    try{
        const pet = await petModel.findOne({_id:petId})
        if(!pet){
            res.status(401).send({message : "pet not found"})
        }
        if (pet.owner.toString() !== userId) {
            return res.status(403).send({ message: "You are not authorized to delete this pet." });
        }

        await petModel.findByIdAndDelete(petId);
        res.status(200).send({ message: "Pet deleted successfully" });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
})

router.put("/edit-pets/:petId",async(req,res)=>{
    const { petId } = req.params;
    try{
        const { _id,...updatedData } = req.body;
        await petModel.findOneAndUpdate({_id:_id},{ $set: updatedData })
        res.status(201).send("updated success")
    }
    catch(error){
        res.status(500).send({ message : "pet not Found",error : error.message} )
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