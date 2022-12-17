const router = require('express').Router();
const Post = require('../models/PostModel');
const cloudinary = require('../cloudinary/cloudinary')

router.get("/posts" ,async (req,res)=> {
    try{
        const posts = await Post.find().sort({_id:-1})
        res.status(200).json(posts)
    }catch(e){
        res.status(400).json({
            "Message":e.message
        })
    }

})

router.post("/posts" ,async(req,res)=>{
    try{
        const {name , location , description } = req.body
        const file = req.files.file.tempFilePath
            const img = await cloudinary.uploader.upload(file,{
                folder : "posts"
            })
            let likes = Math.floor(Math.random()*10000)
            if(likes > 1000){
                likes = likes/1000
            }
            let like = likes.toFixed(1)+"k"
        const post = new Post({
            name:name,
            location:location,
            description:description,
            likes:like,
            image:img.secure_url
        })
       const response = await post.save()
       res.status(200).json({
        "Message":"Post Created",
        "data":response
       })

    }catch(e){
        res.status(400).json({
            "Message":e.message
        })
    }
})



module.exports = router