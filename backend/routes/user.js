const express = require("express"); // routing k liye express ka instance le ayaa

const router = express.Router();//roter impored

const { login, signup } = require("../controllers/Auth");

const { auth, isStudent, isAdmin } = require("../middlewares/auth");//import middleware successfully

router.post("/login", login);
router.post("/signup", signup);

// //protected route
router.get("/student", auth, isStudent,(req, res)=> {
      res.json({
        success: true,
        message:'Welcome to the protected route for Student'
    });
})

router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message:'Welcome to the protected route for Admin'
    });
})

//Testing  protected test route

router.get("/test", auth, (req, res) => {
    res.json({
        success: true,
        message:'Welcome to the protected route for TEST'
    });
})

module.exports = router;//export router