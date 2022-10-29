const User = require("../models/user");
const { validateMail, validatelength } = require("../helpers/validation");

exports.register = async (req, res) => {
  try {
    const { email, phone_no, password } = req.body;
    if (!validateMail(email)) {
      return res.status(400).json({ message: "email is invalid" });
    }
    const check =await User.findOne({ email });
    if (check) {
      return res.status(400).json({ message: "email already exist" });
    }
    
    if (!validatelength(phone_no, 11)) {
      return res.status(400).json({ message: "phone number is incorrect" });
    }
    const user = await new User({
      email,
      phone_no,
      password,
    }).save();

    res.send({
      email: user.email,
      phone_no: user.phone_no,
      password: user.password,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
    // console.log(e);
  }
};
