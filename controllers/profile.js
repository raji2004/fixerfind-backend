//modules
const User = require("../models/user");
const url = require('url')



exports.getprofile = async(req,res)=>{
 const parsedurl= url.parse(req.url,true)
 const query = parsedurl.query
 const user = await User.findOne({query})
 res.send(user)
};
exports.changeprofile = (req,res)=>{
console.log('changeprofile')
res.send('changeprofile')
};

