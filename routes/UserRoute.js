const router = require('express').Router();
const User = require("../models/UserModel");
const { body, validationResult } = require('express-validator');
const Secret = process.env.SECRET_FILE;
const bcrypt = require('bcrypt')


router.post("/register",
    body('email').isEmail(),
    body('password').isLength({ min: 5, max: 16 })
    , async (req, res) => {
        try {
            const { name, email, password } = req.body
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    "message": errors.array()
                })
            } else {
                const isUser = await User.findOne({ email: email })
                if (isUser) {
                    return res.status(400).json({
                        "message": "User Already Exists with Given MAil_Id"
                    })
                } else {
                    bcrypt.hash(password, 10, async function (err, hash) {
                        if (err) {
                            return res.status(400).json({
                                "Message": err.message
                            })
                        }
                        else {
                            const user = new User({
                                name: name,
                                email: email,
                                password: hash
                            })
                            user.save().then(() => {
                                res.status(200).json({
                                    "Message": "User Created SuccessFully",
                                    "User": user
                                })
                            }).catch((e) => {
                                res.status(400).json({
                                    "Message": e.message
                                })
                            })
                        }

                    })
                }
            }


        } catch (e) {
            return res.status(400).json({
                "Error-Message": e.message
            })
        }
    })


module.exports = router