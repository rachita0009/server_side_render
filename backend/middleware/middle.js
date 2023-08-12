const jwt = require("jsonwebtoken");
const Data = require("../models/data");


const verifytoken = (req,res,next)=>{
    const token =  req.body.token  || req.query.token ||req.headers["xtoken"];
    if(!token){
        return res.status(401).send("token is required");

    }
    try{
        const decode = jwt.verify(token,'secret');
    
        console.log(decode)
    }catch(err){
        res.status(400).send("unauthenticated");
    }
    return next();
};
module.exports = verifytoken;



// const checkemail = (req,res,next)=>{
//     var email= req.body.email;
//     var checkexitemail = Data.findOne({$eq 
//         :{email:email}});
//     console.log(checkexitemail+"sdlkfhskdjfjksdfskd")
//     if (checkexitemail) {
//         console.log(checkexitemail)
//         res.status(409).json({
//             status: false,
//             msg:"Email Already Exits ffffffff",
//             })}
//      else{  
//         return next();
//      }
// };


// module.exports= checkemail;