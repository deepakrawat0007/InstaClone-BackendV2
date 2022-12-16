const router = require('express').Router();
const User = require("../models/UserModel");
const { body, validationResult } = require('express-validator');
const secret = "HELLOUSER";
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
router.use(bodyParser.json())

router.post("/register",
    body('email').isEmail(),
    body('password').isLength({ min: 5, max: 16 })
    , async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    "message": errors.array(),
                })
            } else {
                const isUser = await User.findOne({ email: req.body.email })
                if (isUser) {
                    return res.status(400).json({
                        "message": "User Already Exists with Given MAil_Id"
                    })
                } else {
                    bcrypt.hash(req.body.password, 10, async function (err, hash) {
                        if (err) {
                            return res.status(400).json({
                                "Message": err.message
                            })
                        }
                        else {
                            const user = new User({
                                name: req.body.name,
                                email: req.body.email,
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

router.post("/login",
body('email').isEmail()
 , async (req,res)=>{
    try{
        const {email , password} = req.body
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                "Message":errors.array()
            })
        }else{
        const ISuser = await User.findOne({email:email})
        if(!ISuser){
            return res.status(400).json({
                "Message" : "NO USER EXISTS WITH GIVEN MAIL_ID"
            })
        }
        else{
            bcrypt.compare(password , ISuser.password , function(err , result){
                if(err){
                    return res.status(400).json({
                        "Message":err.message
                    })
                }
                if(result){
                    const token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        data: ISuser._id
                    }, secret);

                    return res.status(200).json({
                        "Message":`Logged In SuccessFully Welcome ${ISuser.name}`,
                        "Token":token
                    })
                }else{
                    return res.status(400).json({
                        "Message":"Invalid Credentials"
                    })
                }

            })
        }
        }
    }catch(e){
        return res.status(400).json({
            "message":e.message
        })
    }
})


module.exports = router