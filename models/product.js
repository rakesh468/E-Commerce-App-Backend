const mongoose=require("mongoose");
const joi=require("joi");

const ProductSchema=mongoose.Schema({
         
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
   

})

const Product=mongoose.model("Product",ProductSchema);

const validator=(data)=>{
    const schema=joi.object({
        name:joi.string().required(),
        imageUrl:joi.string().required(),
        description:joi.string().required(),
        price:joi.string().required(),
        
     })
     return schema.validate(data)
}
module.exports={Product,validator}