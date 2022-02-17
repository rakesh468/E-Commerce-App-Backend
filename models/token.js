const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const tokenschema=new Schema({
    userId:{
        type:String,
        required:true,
        ref:"user"
    },
    token:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:3600,
    },
});
module.exports=mongoose.model("token",tokenschema);