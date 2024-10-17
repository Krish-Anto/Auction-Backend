const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const cors = require("cors")
const multer = require('multer')
const  mongoose =  require('mongoose')
const  userRouter = require('./Router/userRoute.js')
const petRouter  = require( './Router/itemRoute.js')
const adoptRouter = require('./Router/AdoptRoute.js')
const app = express()
const Mongo_URL = process.env.Mongo_URL
const PORT = process.env.PORT
app.use(express.json())
app.use(cors())

app.options('*', cors());

app.get("/",(req,res)=>{
  res.send("Welcome to our Pet Shop")
})

// async function createConnection(){
//   const client = new MongoClient(Mongo_URL)
//  try{
//   await client.connect()
//   console.log("Mongo Connection Started")
//   return client
//  }
//  catch(error){
//     console.error("Failed to connect to MongoDB", err);
//         throw err;
//  }
// }

// const client = await createConnection()

mongoose.connect(Mongo_URL)
.then(()=>{
    console.log("Mongodb Connected")
    app.listen(PORT,()=>console.log("Server started on the PORT",PORT))
})
.catch((error)=>{
    console.log("Error",error)
})

// app.listen(process.env.port,()=>{
//   console.log(`App is running in https://localhost/${process.env.port}`)
// }
// )

app.use("/users",userRouter)
app.use("/pets",petRouter)
app.use("/adoptForm",adoptRouter)


