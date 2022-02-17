const mongoose=require("mongoose");

//validating objectid//
module.exports=(request,response,next)=>{
    if(!mongoose.isValidObjectId(request.params.id)){
        return response.status(400).send({message:"Invalid Id"})
    }
    next();
}