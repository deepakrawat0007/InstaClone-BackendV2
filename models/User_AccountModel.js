const mongoose = require("mongoose")

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const AccountModal = new Schema({
    email:{type:String , unique:true , required:true},
    username:{type:String , required:true},
    bio:{type:String },
    profileImg:{type:String}
},{timestamps:true})

const Account = mongoose.model("Accounts" , AccountModal)

module.exports = Account;