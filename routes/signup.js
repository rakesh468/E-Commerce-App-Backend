const{User,validation}=require("../models/user");
const bcrypt=require("bcrypt");
const router = require("./product");


//create signup using post method//
router.post("/signup",async(request,response)=>{
    try {
        const {error}=validation(request.body);
        if(error)
        return response.status(400).send({message:error.details[0].message});

        const user=await User.findOne({email:request.body.email})
        if(user)
        return response.status(409).send({message:"Email Already Exist!!"})
        
       //generating  salt and hashedpassword using bcrypt package// 
        const salt=await bcrypt.genSalt(Number(process.env.SALT));
        const hashedpassword=await bcrypt.hash(request.body.password,salt)
        await new User({...request.body,password:hashedpassword}).save();
        response.status(201).send({message:"User Created Successfully"})
    
    } catch (error) {
    response.status(500).send(error)    
    }
})
module.exports=router;