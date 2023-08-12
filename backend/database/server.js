const mongoose = require("mongoose");


const connectdb = async ()=>{

    try {
        await mongoose.connect("mongodb://localhost:27017/crudapp",
       {
         useNewUrlParser:true,
        }
        );
        console.log("mongodb connection successfull...");
    } catch (err){
        console.log(err);
    }
};

connectdb();