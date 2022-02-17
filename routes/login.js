const{User}=require("../models/user");
const router=require("express").Router();
const bcrypt=require("bcrypt");

//login route path using post method//
router.post("/login",async(request,response)=>{
    try {
        //to find email id matches//
        const user=await User.findOne({email:request.body.email});
        if(!user)
        return response.status(400).send({message:"Invalid email"})
         //email id matches compare password//
        const validatePassword=await bcrypt.compare(request.body.password,user.password)
        if(!validatePassword)
        return response.status(401).send({message:"Invalid password"})
         //generate jsonwebtoken//
        const token=user.generateAuthToken();
        response.status(200).send({data:token,message:"Logged Successfully"})
        
    } catch (error) {
        response.status(500).send(error);
        console.log(error)
    }
})
module.exports=router;