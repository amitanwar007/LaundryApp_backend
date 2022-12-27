const express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const SECRET = "RESTAPI" 

const { body, validationResult } = require('express-validator')

const router = express.Router()
//router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser());

/* =========================== REGISTER ===============================*/

router.post("/register", body("name").isAlpha(), body("email").isEmail(), body("phone").isNumeric(), body("password").isLength({ min: 6, max: 16 }), async (req, res) => {
    console.log(req.body)
    
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { name, email, phone, state, district, address, pincode, password } = req.body
        bcrypt.hash(password, 10, async function(err, hash) {
            if (err) {
                return res.status(400).json({
                    status: "failed",
                    message: "invalid details"
                })
            }
            console.log("creating user");
        

        const user = await User.create({
            name,
            email,
            phone,
            state,
            district,
            address,
            pincode,
            password: hash
        })
        return res.status(200).json({
            status: "Success",
            data: user
        })
    })
} catch(e) {
    console.log("inside catch block");
    return res.status(400).json({
        status: "Failed",
        message: e.message
    })
}
})

module.exports = router