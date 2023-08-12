require('../database/server');

const mongoose = require("mongoose");
// const validator = require("validator");

const dataschema = new mongoose.Schema({
    Firstname:{
        type: String,
        required  : true,
        minlength: 3
    },
    Lastname:{
        type: String,
        required  : true,
        minlength: 3
    },
    email :{
        type: String,
        required : true,
        unique : [true ,"email is already exist"]
    },
    mobile:{
        type: Number,
        required  : true,
        minlength:10
    
    },
    gender :{
        type:String,
        required : true

    },
    
    password :{
        type : String,
        required : true
    },
    image:{
        default:'',
        type: String,
        
  },
    status : {
        type: Number,
        default :1
     },
    
    
}) 


// const imageschema = new mongoose.Schema({
//     Firstname:{
//         type: String,
//         required  : true,
//         minlength: 3
//     },
//     image:{
//         // default:'',
//         type: String,
        
//   },

// })

const  Data = new mongoose.model('Data', dataschema);

// const  Image = new mongoose.model('Image', imageschema);

module.exports = Data