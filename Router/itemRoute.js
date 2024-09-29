const express = require('express')
const router = express.Router()
const petModel = require('../model/petModel')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory for uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique file name
    }
});
const upload = multer({ storage: storage });

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

router.post('/create-pets', auth, upload.array('photos', 5), async (req, res) => {
    const { name, breed, details } = req.body;

    try {
        const decoded = jwt.verify(req.header('x-auth-token'), process.env.SECRET_KEY);
        const newPet = new petModel({
            name,
            breed,
            details,
            owner: decoded.id, // Set the owner to the logged-in user
            image: req.files.map(file => file.path), // Save file paths
        });

        await newPet.save();
        res.status(201).json({ message: 'Pet added successfully' });
    } catch (error) {
        console.error('Error adding pet:', error);
        res.status(500).json({ message: 'Failed to add pet', error: error.message });
    }
});

router.get("/get-pets",async(req,res)=>{
    try{
        const items = await petModel.find()
        res.status(201).json(items)
    }
    catch(error){
        res.status(500).json(error)
    }
})

router.post("/delete-pets",async(req,res)=>{
    try{
        const item = await petModel.findOneAndDelete({_id : req.body.id})
        item?res.send("Item deleted successfully") : res.send("item not found")
    }
    catch(error){
        res.status(400).send(error)
    }
})

router.post("/edit-pets",async(req,res)=>{
    try{
        await petModel.findOneAndUpdate({_id:req.body.id},req.body)
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