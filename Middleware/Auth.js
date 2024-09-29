const jwt = require('jsonwebtoken')

const auth =(req,res,next)=>{
try{
    const token = req.header("x-auth-token")?.split(' ')[1];    
    console.log(token)
    if(!token){
        return res.status(401).send({ message: "Access denied. No token provided." });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Verify the token
        req.user = decoded; 
    next()
}
catch(err){
     res.status(401).send({error : err.message})
}
}

module.exports = auth