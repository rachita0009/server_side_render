require('../database/server');

const mongoose = require("mongoose");
// const validator = require("validator"

const imageschema = new mongoose.Schema({
    Firstname:{
        type: String,
        required  : true,
        minlength: 3
    },
    image:{
        default:'',
        // required  : true,
        type: String,
        
  },

})
const  Image = new mongoose.model('Image', imageschema);
module.exports = Image