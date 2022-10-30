const User = require("../models/user");
const {
  validateMail,
  validatelength,
  Mailer,
  randNum,
} = require("../helpers/validation");

exports.register = async (req, res) => {
  let so = true;
  try {
    const { email, phone_no, password } = req.body;
    if (!validateMail(email)) {
      return res.status(400).json({ message: "email is invalid" });
    }
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({ message: "email already exist" });
    }

    if (!validatelength(phone_no, 11)) {
      return res.status(400).json({ message: "phone number is incorrect" });
    }
    let code = randNum();
    while (so) {
      const some = await User.findOne({ code });
      if (some) {
        code = randNum();
        so = false;
      } else {
        so = false;
      }
    }
    const num = code;

    try {
      Mailer(email, email, num);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
    const user = await new User({
      email,
      phone_no,
      password,
      info: {
        code: num.toString(),
      },
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

exports.validate = async (req, res) => {
  try {
    const { code } = req.body;
    const pin = await User.findOne({ code });
    let { info, verified } = pin;
   
   
    if (pin) {
      verified = true;
    } else {
      res.status(400).json({ message: "pin is wrong" });
    }
    if ((verified = true)) {
      
      await User.updateOne({ $unset:{info}, verified });
    }
    res.send("success!");
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
