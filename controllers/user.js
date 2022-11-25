const User = require("../models/user");
const uniqid = require("uniqid");
const {
  validateMail,
  validatelength,
  Mailer,
  randNum,
  reset,
  Success
} = require("../helpers/validation");


exports.register = async (req, res) => {
  // res.header("Access-Control-Allow-Origin");
  let so = true;
  try {
    const { email, phone_no, password, confirm_password } = req.body;
    if (!validateMail(email)) {
      return res.status(400).json({ message: "Email is invalid" });
    }
    const check = await User.findOne({ email:email.toLowerCase() });
    if (check) {
      return res.status(400).json({ message: "Email already registered" });
    }
    //no error
    if (!validatelength(phone_no, 11, 15)) {
      return res.status(400).json({ message: "Phone number is invalid" });
    }

    const num = randNum();
    const id = uniqid();

    try {
      Mailer( email, num);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
    const user = await new User({
      id,
      email:email.toLowerCase(),
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

    // console.log(user);
    let { code, verified, id, time, email } = user;
    const exp = Number(time) + 18000000
    const currenttime = new Date().getTime()

    if (user) {
      if (currenttime >= exp) {
        res.status(400).json({ message: "Your pin has expired check your mail a new one has been sent you" })
        try {
          const num = randNum();
          Mailer( email, num);
          code = num
          time = currenttime
          const newuser = await User.findOneAndUpdate(
            { id },
            { code, time, verified })

        } catch (e) {
          console.log(e.message)
          return e.message
        }
      }
      else {

        verified = true;
        if (verified) {
          const newuser = await User.findOneAndUpdate(
            { id },
            { $unset: { code, time }, verified }
          );
          Success(email)
          res.send({ newuser });
        }
      }
    } else {
      res.status(400).json({ message: "pin is wrong" });
    }
  } catch (e) {
    return res.status(500).json({ message: "Your verification pin is incorrect" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email:email.toLowerCase(), password });
    const { verified,id } = user;
    if (user) {
      if (verified) { 
        res.send({ user })
      
      }else{
         await User.findOneAndDelete({id})
          res.status(400).json({ message: "Please verify your account" });
        }


    

    }//else {
    //     res.status(400).json({ message: "email or password is incorrect" });
    //  }
  } catch (e) {
    res.status(400).json({ message: "Email or password is incorrect" });;
  }
};
exports.forgotpassword = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email:email.toLowerCase() })
  if (user) {
    const code = randNum();
    const { email, id } = user
    const time = new Date().getTime()
    try {
      reset( email, code)
      const newuser = await User.findOneAndUpdate(
        { id },
        { code, time }
      );
      res.send({ email, id })
    } catch (e) {
      res.status(400).json({ message: e.message })
    }

  } else {
    res.status(400).json({ message: "Email is not registered" })
  }

}
exports.resetpassword = async (req, res) => {
  const { id, password } = req.body
  const user = await User.findOneAndUpdate({ id }, { password })
  if (user) {
    res.send({ user })
  } else {
    res.status(400).json({ message: "User not found" })
  }
}
