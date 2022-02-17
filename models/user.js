const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const joi=require("joi");




const userSchema =new mongoose.Schema({
     firstname:{
         type:String,
         required:true
     },
     lastname:{
         type:String,
         required:true
     },
     email:{
         type:String,
         required:true
     },
     password:{
         type:String,
         required:true
     }

})

userSchema.methods.generateAuthToken= function(){
    const token=jwt.sign({_id:this._id},process.env.SECRET_KEY,{expiresIn:"7d",
});
    return token;
}

const User=mongoose.model("user",userSchema);

const validation=(data)=>{
    const schema=joi.object({
        firstname:joi.string().required().label("Firstname Required"),
        lastname:joi.string().required().label("lastname Required"),
        email:joi.string().email().required().label("Email Required"),
        password:joi.string().required().label("password Required")
    });
    return schema.validate(data)
};
module.exports={User,validation};