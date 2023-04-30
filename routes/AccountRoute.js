const router = require('express').Router();
const Post = require('../models/PostModel');
const User = require('../models/UserModel');
const cloudinary = require('../cloudinary/cloudinary')
const Account = require("../models/User_AccountModel")


router.get("/userAccount" , async(req, res)=>{
    try{
        const user = await User.findOne({_id:req.user})

        const account = await Account.findOne({email:user.email})
        const posts = await Post.find({user:req.user})

        return res.status(200).json({
            Details:account,
            posts:posts
        })

    }catch(e){
        return res.status(400).json({
            message:e.message
        })
    }
})



module.exports = router