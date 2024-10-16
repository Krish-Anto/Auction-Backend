const express = require('express')
const router = express.Router()
const petModel = require('../model/petModel')
const multer = require('multer')
const path = require('path')
const auth = require('../Middleware/Auth')
const authorizeRoles = require('../Middleware/Authorize')

const storage = multer.diskStorage({
    destination : './uploads',
    filename:(req,file,cb) =>{
     cb(null,Date.now()+path.extname(file.originalname));   
    }
})

const upload = multer({
    storage : storage,
    limits : {fileSize : 3000000},
    fileFilter : (req,file,cb)=>{
        checkFileType(file,cb)
    }
}).single('image');

function checkFileType(file,cb){
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if(extname&&mimetype){
        return cb(null,true);
    }else{
        cb('Error : Images only');
    }
}

router.post('/addpets',auth,authorizeRoles('owner','admin'), upload, async (req, res) => {
    // const { name, breed, gender,details,image } = req.body;
    
    try {
        const ownerId = req.user.id; 
        const { name, breed, gender,details } = req.body;
        const image = req.file?req.file.path : '';
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

router.delete("/delete-pet/:petId",auth,authorizeRoles('owner','admin'),async(req,res)=>{
    
    const  petId  = req.params.petId;
    console.log(petId)
    const userId = req.user.id;
    console.log(userId)
    try{
        const pet = await petModel.findOne({_id:petId})
        if(!pet){
            return res.status(401).send({message : "pet not found"})
        }
        console.log("owner",pet.owner);
        if (pet.owner.toString() !== userId) {
            return res.status(403).send({ message: "You are not authorized to delete this pet." });
        }
        await petModel.findByIdAndDelete(petId);
        res.status(200).send({ message: "Pet deleted successfully" });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
})

router.put("/edit-pet/:petId",async(req,res)=>{
    const { petId } = req.params.petId;
    try{
        
        const { name , breed,gender,details } = req.body;
        const image = req.file?req.file.path : req.body.image;
        const updated =  await petModel.findByIdAndUpdate(req.params.petId,{name,breed,gender,details,image},{new : true})
        res.status(201).send("updated success")
        if (!updated) {
            return res.status(404).json({ success: false, message: 'Pet not found' });
          }
          res.json({ success: true, pet: updated });
    }
    catch(error){
        res.status(500).json({ success: false, message: 'Failed to update pet', error });
    }
})

4
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