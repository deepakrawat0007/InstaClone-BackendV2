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
router.put("/updateProfilePic" , async(req , res)=>{
    try{
        const file = req.files.file.tempFilePath
        const img = await cloudinary.uploader.upload(file,{
            folder : "profile"
        })
    const UpdateImage = await User.findByIdAndUpdate(req.user,{ $set:{'profileImg': img.secure_url}},
        {
        new: true,
        useFindAndModity: false
      })
      return res.status(200).json({
        message:"Profile Image Updated SuccessFully",
        image:req.body.image
      })
    }catch(e){
        return res.status(400).json({message:e.message})
    }
     
})


module.exports = router