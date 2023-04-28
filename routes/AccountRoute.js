const router = require('express').Router();
const Post = require('../models/PostModel');
const User = require('../models/UserModel');
const cloudinary = require('../cloudinary/cloudinary')
const Account = require("../models/User_AccountModel")


router.post("/user/detail" , async(req,res)=>{
    try{
        // const user = await User.findById(req.user)
        const {username , Bio} = req.body
        const file = req.files.file.tempFilePath
            const img = await cloudinary.uploader.upload(file,{
                folder : "profile"
            })
            const account = new Account({
                username:username,
                Bio:Bio,
                profileImg:img.secure_url,
                userId:req.user
            })
           const response = await account.save()
           res.status(200).json({
            "Message":"Profile Created",
            "data":response
           })


    }catch(e){
        return res.status(400).json({
            'message':e.message
        })
    }
})

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