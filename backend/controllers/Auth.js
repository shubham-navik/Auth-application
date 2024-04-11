
const bcrypt = require('bcrypt');

const User = require('../models/User');
const jwt = require("jsonwebtoken");
const { options } = require('../routes/user');
require('dotenv').config();
//sign up route handler

exports.signup = async (req, res) => {
    try {
        // get dta
        const { name, email, password, role } = req.body;
        //check user existence

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "user already exist",
            });
        }

        let hashPassword;
        try {
            hashPassword = await bcrypt.hash(password, 10);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error in hashing password',
            });
        }

        // create entry for user
        const user = await User.create({
            name,email,password:hashPassword,role
        })

        return res.status(200).json({
            success: true,
            message:'user created successfully'
        })

    }
    catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: 'user cannt be resisterd ,please try again later'
        });
        
    }
}


//login

exports.login = async (req, res) => {
    
    try {

        //data fatch first
        const { email, password } = req.body;
        //validation on email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message:'plase fill all data carefully'
            })
        }
        // check the resistered user
        let user = await User.findOne({ email });

        //if not user
        if (!user) {
            return res.status(401).json({
                success: false,
                message:'user is not resistered '
            })
        }


        //creating paylod (passing info )
        const payload = {
            email: user.email,
            id: user._id,
            role: user.role
        };
        //verify password and jwt  token generation
        if (await bcrypt.compare(password, user.password)) {
            //password match
            //generate token
            let token = jwt.sign(payload, process.env.JWT_SECRET,
                {
                    expiresIn: "2h",
                                    
                });
            user = user.toObject();
            console.log(user)
            user.token = token;
            console.log(user)

            user.password = undefined //removing password from user object not user database so that not hacked
            console.log(user)

            //creating cookie
            // pass cookieName ,cookieData,Option
            const options = {
                expires: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
                httpOnly:true
            }//creating option for cookie

            res.cookie("shubhamCookie", token, options).status(200).json({
                success: true,
                token,
                user,
                message: 'User logged in suucessfully'
            });

            
        } else {
            //password not match
            return res.status(403).json({
                success: false,
                message:'passord not match'
            })
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Login failure",
        });
    }
}