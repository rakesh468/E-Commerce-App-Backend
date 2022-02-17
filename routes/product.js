const express=require("express")
const router=express.Router();
const {Product,validator}=require("../models/product");
const validate=require("../middleware/validate");
const asyncHandler=require("../middleware/ayncHandler");
const  isValidObjectId=require("../middleware/isValidObjectId");


//Get all product using GET method//
router.get("/",asyncHandler(async(request,response)=>{
         const product=await Product.find({});
         response.send(product);
         console.log(product)
}))

//create an product using POST method//
router.post("/",validate(validator),asyncHandler(async(request,response)=>{
    const product=await Product(request.body).save();
    response.send(product)
}))

//Get product by Id using GET method//
router.get("/:id",asyncHandler(async(request,response)=>{
   const product= await Product.findById({_id:request.params.id})
   response.send(product);
   console.log(product)
}))

//Update product by id using PUT method//
router.put("/:id",asyncHandler(async(request,response)=>{
    const updatedproduct=await Product.findByIdAndUpdate({_id:request.params.id},request.body)
    response.status(200).send(updatedproduct)
}))

//delete product by Id usinng DELETE method//
router.delete("/:id",asyncHandler(async(request,response)=>{
    await Product.findByIdAndDelete(request.params.id);
    response.status(200).send({message:"Product Deleted"})
}))

 module.exports=router;