const express = require('express')
const userModel= require('../model/userModel')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config()
const jwt = require('jsonwebtoken')


const router = express.Router()

router.post("/register",async(req,res)=>{
 try{
    const { userId, password, name, email, role } = req.body;
    console.log(req.body)
    const UserExists = await userModel.findOne({$or:[{userId},{email}]})
    if(UserExists){
        return res.status(400).json({message : "User Already Exist"})
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("hashed :",hashedPassword)
    
    const newUser = new userModel({
        name : name,
        userId : userId,
        email:email,
        password: hashedPassword,
        role:role || "adopter",
        verified : true
    });
   await newUser.save()
   
   res.status(201).json({ message: 'User registered successfully'});
 }
 catch(error){
    console.log(error)
   res.send({message : "Error registering User"})
 }
})

router.post("/login",async(req,res)=>{
    try{
        const { userId, password } = req.body
        const user = await userModel.findOne({userId : userId})
        if(!user){
            res.status(401).send({message : "Invalid Credentiall"})
            return
        }
        const dbPassword = user.password
        console.log(dbPassword)
        const isPasswordMatch = await bcrypt.compare(password,dbPassword)
        console.log(isPasswordMatch)
        if (!isPasswordMatch) {
            return res.status(401).send({ message: "Invalid Credentials" });
          }
        const token = jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn: '1h'})
        res.status(200).send({message : "Successful",token : token,id:user._id,role : user.role})
    }
    catch(error){
        console.error("Error:",error)
     res.status(400).json({message : "Internal Service Error","err" : error})
    }
})

module.exports = router;