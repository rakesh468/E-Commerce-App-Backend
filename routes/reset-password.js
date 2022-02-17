const { User } = require("../models/user");
const Token = require("../models/token");
const sendmail = require("../Utility/sendmail");
const Joi = require("joi");
const crypto = require("crypto");
const express = require("express");
const router = express.Router();
const bcrypt=require("bcrypt");

router.post("/resetpassword", async (request, response) => {
  try {
    const schema = Joi.object({ email: Joi.string().email().required() });
    const { error } = schema.validate(request.body);
    if (error) response.status(400).send(error);
    const user = await User.findOne({ email: request.body.email });
    if (!user) response.status(400).send({ message: "User is not exist" });
    let token = await Token.findOne({ userId: user._id });
    if (!token)
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();

    const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
    await sendmail(user.email, "Resetpassword", link);
    response.send({ message: "Password Reset link sent to your email" });
  } catch (error) {
    response.send(error);
    console.log(error);
  }
});


router.post("/:userId/:token", async (request, response) => {
    try {
      const schema = Joi.object({ password: Joi.string().required() });
      const { error } = schema.validate(request.body);
      if (error) return response.status(400).send(error.details[0].message);
      const user = await User.findById(request.params.userId);
      if (!user) response.status(400).send({ message: "Invalid link" });
  
      const token = await Token.findOne({
        userId: user._id,
        token: request.params.token,
      });
      if (!token) response.send({ message: "Invalid link" });
      const salt=await bcrypt.genSalt(Number(process.env.SALT));
      user.password=await bcrypt.hash(request.body.password,salt);
      await user.save();
      await token.delete();
      response.send({ message: "Password reset successfully" });
    } catch (error) {
      response.send(error);
      console.log(error);
    }
  });
  module.exports=router;