const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PostSchema = new Schema({
name:{type:String , required:true},
location:{type:String , required:true},
description:{type:String , required:true},
likes:{type:Number , required :true},
image:{type:String , required:true}
})

const Post = mongoose.model("Posts" , PostSchema)

module.exports = Post