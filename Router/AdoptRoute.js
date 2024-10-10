const express = require('express')
const router = express.Router()
const AdoptModel = require('../model/adoptModel');
const { sendNotification } = require('../Service/nodemailer');


router.post("/submit",async(req,res)=>{
    const { name, email, phone, details, petId } = req.body;
  try{
   const newAdoptForm = new AdoptModel({
    name : name,
    email : email,
    phone : phone,
    details:details,
    petId : petId
   })
   await newAdoptForm.save()

   const pet = await petModel.findById(petId).populate('owner')
   const ownermail = pet.owner.email
   await sendNotification(ownermail,{name,email,phone,details})
   res.status(201).json({message : "Form submitted successfully"})
  }
  catch(error){
    console.error('Error submitting adoption form:', error);
    res.status(500).json({ message: 'Failed to submit the form.',"error":error});
  }
})


module.exports = router