//middleware ka mtlab

// req travelling ..........middleware ..........routes

//middleware check krega aur bataeg aaap authorised ho is route k liye ya nhi ho


//auth isStudent isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

//first middleware likh rha hu
exports.auth = (req, res, next) => {
    
    try {
        // extract jwt token
       //other way to fatch token
        const token = req.body.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message:"token missing"
            })
        }

        //verify the token ....  verify method avilible in jwt library
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);

            req.user = decode;

        } catch (error) {
            return res.status(401).json({
                success: false,
                message:'token is invalid'
            })
        }
        next();
        
    } catch (error) {
        return res.status(401).json({
            success: false,
            message:'something went wrong while verifying the token'
        })
    }
}

// seocnd middleware

exports.isStudent = (req, res, next) => {
    try {
        if (req.user.role !== "Student") {
            return res.status(401).json({
                success: false,
                message:'this is protectde route for student'
            })
        }
        next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message:'user role is not match'
        })
    }
}

//malware for admin

exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message:'this is protectde route for Admin'
            })
        }
        next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message:'user role is not match'
        })
    }
}