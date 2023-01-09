//modules
const User = require("../models/user");
const uniqid = require("uniqid");
const {
  validateMail,
  validatelength,
  Mailer,
  randNum,
  reset,
  Success,
  has31DaysPassed
} = require("../helpers/validation");

// regiter api
exports.register = async (req, res) => {


  try {
    const { email, phone_no, password, confirm_password } = req.body;
    if (!validateMail(email)) {
      return res.status(400).json({ message: "Email is invalid" });
    }
    const check = await User.findOne({ email: email.toLowerCase() });

    if (check) {
      const { deleted, id } = check

      if (deleted === true) {
        await User.findOneAndDelete(id)
      } else {
        return res.status(400).json({ message: "Email already registered" });
      }


    }

    if (!validatelength(phone_no, 11, 15)) {
      return res.status(400).json({ message: "Phone number is invalid" });
    }

    const num = randNum();
    const id = uniqid();

    try {
      await Mailer(email, num);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
    const user = await new User({
      id,
      email: email.toLowerCase(),
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

  }
};


// validate api
exports.validate = async (req, res) => {
  try {
    const { cod } = req.body;
    const user = await User.findOne({ code: cod });

    let { code, verified, id, time, email } = user;
    const exp = Number(time) + 18000000
    const currenttime = new Date().getTime()

    if (user) {
      if (currenttime >= exp) {
        res.status(400).json({ message: "Your pin has expired check your mail a new one has been sent you" })
        try {
          const num = randNum();
          await Mailer(email, num);
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
          await Success(email)
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
// login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase(), password });
    const { verified, id, deleted, deletedtime } = user;
    const todays = new Date()
    const timeRequested = new Date(deletedtime)
    if (has31DaysPassed(timeRequested, todays)) {
      user.findOneAndUpdate({ id }, { $unset: { deletedtime }, deleted: true })
    }else{
      user.findOneAndUpdate({id},{$unset: { deletedtime }})
    }

    if (user && deleted === false) {
      if (verified) {
        res.send({ user })

      } else {
        await User.findOneAndDelete({ id })
        res.status(400).json({ message: "Please verify your account" });
      }
    } else {
      res.status(400).json({ message: "Email or password is incorrect" });
    }
  } catch (e) {
    res.status(400).json({ message: e.message});;
  }
};
//forgot password
exports.forgotpassword = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email: email.toLowerCase() })
  if (user) {
    const code = randNum();
    const { email, id } = user
    const time = new Date().getTime()
    try {
      await reset(email, code)
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


// reset password
exports.resetpassword = async (req, res) => {
  const { id, password } = req.body
  const user = await User.findOneAndUpdate({ id }, { password })
  if (user) {
    res.send({ user })
  } else {
    res.status(400).json({ message: "User not found" })
  }
}

exports.deleted = async (req, res) => {
  const { id } = req.body
  const date = new Date()
  const user = await User.findOneAndUpdate({ id }, { deletedtime: date })
  user ? res.send(user) : res.status(404).json({ message: "user not found" })
}
