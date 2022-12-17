const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const PostSchema = new Schema({
name:{type:String , required:true},
location:{type:String , required:true},
description:{type:String , required:true},
likes:{type:String , required :true},
image:{type:String , required:true},
user:{type:ObjectId , required:true},
username:{type:String,required:true}
})

const Post = mongoose.model("Posts" , PostSchema)

module.exports = Post