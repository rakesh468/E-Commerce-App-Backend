const nodemailer=require("nodemailer");

module.exports=async(email,subject,text)=>{
    try {
        const transporter=nodemailer.createTransport({
            host:process.env.PORT,
            service:process.env.SERVICE,
            port:587,
            secure:true,
            auth:{
                user:process.env.USER,
                pass:process.env.PASS,
            },
        });
        await transporter.sendMail({
            from:process.env.USER,
            to:email,
            subject:subject,
            text:text,
        });
        console.log("Email sent Successfullt")
        
    } catch (error) {
        console.log(error,"Email not sent")
        console.log(error)
        
    }
};