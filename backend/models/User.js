
//mmodel banne k liye do chijo ko jrurt hoti hai 1. name of model and 2. is schemma
// schemma banane k liye mongoose ki jrrurt hoti hai

const mongoose = require("mongoose");

const userSchema =new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        trim:true,
    },
    password: {
        type: String,
        required:true,
    },
    role: {
        type: String,
        enum:["Admin", "Student", "Visitor"],
    }
    
})


// now export scheema

module.exports = mongoose.model("user", userSchema);//extorted userscheema as user