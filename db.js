const mongoose=require("mongoose");
const asyncHandler=require("./middleware/ayncHandler");

module.exports=asyncHandler(async()=>{
    const connectionParams={
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
    const connection=await mongoose.connect(process.env.DB,connectionParams)
    connection ?
    console.log("DataBase Connected")
    : console.log("DtaBase Not Connected")

})