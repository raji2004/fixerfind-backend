const User = require("../models/user");
const uniqid = require("uniqid");
const {
  validateMail,
  validatelength,
  Mailer,
  randNum,
  Success,
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

    const num = randNum();
    const id = uniqid();

    try {
      Mailer(email, email, num);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
    const user = await new User({
      id,
      email,
      phone_no,
      password,
      code: num.toString(),
      time: new Date().getTime()
    }).save();

    res.send({
      id: user.id,
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
    const { cod } = req.body;
    const user = await User.findOne({ code: cod });

    console.log(user);
    let { code, verified, id } = user;

    if (user) {
      verified = true;
      if (verified) {
        const newuser = await User.findOneAndUpdate(
          { id },
          { $unset: { code }, verified }
        );
        res.send({ newuser });
      }
    } else {
      res.status(400).json({ message: "pin is wrong" });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    const { verified } = user;
    if (user) {
      verified
        ? res.send({ message: "login successful" })
        : res.send({ message: "please verify your account" });
      res.send({ user });
    } else {
      res.status(400).json({ message: "email or password is incorrect" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
