const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const cors = require("cors")
const  mongoose =  require('mongoose')
const  userRouter = require('./Router/userRoute.js')
const itemRouter  = require( './Router/itemRoute.js')
const billRouter = require('./Router/billRoute.js')

const app = express()
const Mongo_URL = process.env.Mongo_URL
const PORT = process.env.PORT
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
  res.send("Welcome to our Pet Shop")
})

mongoose.connect(Mongo_URL)
.then(()=>{
    console.log("Mongodb Connected")
    app.listen(PORT,()=>console.log("Server started on the PORT",PORT))
})
.catch((error)=>{
    console.log("Error",error)
})

app.use("/users",userRouter)
app.use("/items",itemRouter)
app.use("/bills",billRouter)