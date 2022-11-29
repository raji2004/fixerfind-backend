//modules
const User = require("../models/user");
const url = require('url')



exports.getprofile = async(req,res)=>{
 const parsedurl= url.parse(req.url,true)
 const id = parsedurl.query
 const user = await User.findOne(id)
 user?res.send(user):res.status(404).json({message:"user not found"})
 
};

exports.changeprofile = async(req,res)=>{
  const {id,Firstname,Lastname,email,phone_no,location,description,socials} = req.body
  const data = {Firstname,Lastname,email,phone_no,location,description,socials}
  const user = await User.findOneAndUpdate({id},data)


};

