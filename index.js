require("dotenv").config();
const express=require("express");
const app=express();
const cors=require("cors");
const connection =require("./db");
const productRouter=require("./routes/product");
const signupRouter=require("./routes/signup");
const loginRouter=require("./routes/login")
const resetRouter=require("./routes/reset-password");

const PORT=process.env.PORT;

//DataBase Connection//
connection();

//middleware//
app.use(express.json());
app.use(cors());



app.get("/",(request,response)=>{
    response.send("Hello world");
})

//routes//
app.use("/products",productRouter);
app.use("/user",signupRouter)
app.use("/user",loginRouter)
app.use("/user",resetRouter)
  
app.listen(PORT,()=>console.log(`APP Running in ${PORT}`))
