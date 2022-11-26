const nodeMail = require("nodemailer");

exports.validateMail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);
};
exports.validatelength = (number, min, max) => {
  //   console.log(String(number).length);
  //   console.log(number)
  return String(number).length >= min && String(number).length <= max ? true : false;
};
exports.Mailer = async ( email, pin) => {
  const transporter = await nodeMail.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });
  const mailOption = {
    from: process.env.EMAIL,
    to: email,
    subject: `Registration Code`,
    html: `
    <div style='background-color: #fff;'>
    <div class="msg-body">
    <div class="msg-logocon">
    <img src="https://firebasestorage.googleapis.com/v0/b/projectmate-a0f82.appspot.com/o/logo%26name.jpeg?alt=media&token=864d6233-e6bd-4183-99c5-2c4d40132a1b" alt="FixerFind" id="msg-logo">
    </div>
    <hr />
    <div class="msg-textcon">
    <div class="msg-textcon2">
    <h4>Hi soon to be FixerFinder,</h4>
    <p>Prove your the one, by using this OTP sent below before it expires in <span>10 minutes</span>, to
    complete your Registration.
    </p>
    <p>PIN: <b>${pin}</b></p>
    <p>If you have any questions, feel free to <a href="mailto:info@fixerfind.co" id="msg-link">reach
    out to us.</a>
    </p>
    </div>
    </div>
    </div>
    <hr />
    <footer>
    <div class="footer-body">
    <div class="footer-text">Copyright <span>&#169;</span> Alvaindes Limited. All Rights Reserved.</div>
    <div class="footer-text">To stop recieving messages from us, you can change your notification settings.
    </div>
    <div class="footer-text"><a href="mailto:info@fixerfind.co">info@fixerfind.co</a>| 07063455750</div>
    </div>
    </footer>
    </div>
    `
  };
  try {
    await transporter.sendMail(mailOption);
  } catch (error) {
    return error.message;
  }
};
exports.Success = async ( email) => {
  const transportr = await nodeMail.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });
  const mailOptio = {
    from: process.env.EMAIL,
    to: email,
    subject: "Fixer find team",
    html: `
    <div class="msg-body" style='background-color: blue;'>
    <div class="msg-logocon">
    <img src="https://firebasestorage.googleapis.com/v0/b/projectmate-a0f82.appspot.com/o/logo%26name.jpeg?alt=media&token=864d6233-e6bd-4183-99c5-2c4d40132a1b" alt="FixerFind" id="msg-logo">
    </div>
    <hr />
    <div class="msg-textcon">
    <div class="msg-textcon2">
    <h4>Hey FixerFinder,</h4>
    <p>Congratulations! We're glad to have you in our community, all your benefits are just beginning.😎
    </p>
    <p>Keep in mind, you can also become a Service Provider yourself and render your services in the
    community to customers at your rate.😁💵</p>
    <p>Do this easily by simply going to our app, click on "Settings", then click on "Become a Service
    Provider" and follow the quick instructions.</p>
    <p>If you have any questions, feel free to <a href="mailto:info@fixerfind.co" id="msg-link">reach
    out to us.</a>
    </p>
    <p>With us, it's a win! win!!</p>
    <div class="msg-logocon">
    <img src="../images/ffweb2.jpeg" alt="" id="msg-pic">
    </div>
    </div>
    </div>
    </div>
    <hr />
    <footer>
    <div class="footer-body">
    <div class="footer-text">Copyright <span>&#169;</span> Alvaindes Limited. All Rights Reserved.</div>
    <div class="footer-text">To stop recieving messages from us, you can change your notification settings.
    </div>
    <div class="footer-text"><a href="mailto:info@fixerfind.co">info@fixerfind.co</a>| 07063455750</div>
    </div>
    </footer>
    `,
  };
  try {
    await transportr.sendMail(mailOptio);
  } catch (error) {
    return error.message;
  }
};

exports.randNum = () => {
  return Math.floor(10000 + Math.random() * 90000);

};
exports.reset = async ( email, pin) => {
  const transporter = await nodeMail.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });
  const mailOption = {
    from: process.env.EMAIL,
    to: email,
    subject: `Reset-Password Verification Code`,
    html: `
    <div style='background-color: white;'>
    <div class="msg-body" style='background-color: #fff;'>
    <div class="msg-logocon">
    <img src="https://firebasestorage.googleapis.com/v0/b/projectmate-a0f82.appspot.com/o/logo%26name.jpeg?alt=media&token=864d6233-e6bd-4183-99c5-2c4d40132a1b" alt="FixerFind" id="msg-logo">
    </div>
    <hr />
    <div class="msg-textcon">
    <div class="msg-textcon2">
    <h4>Hi FixerFinder,</h4>
    <p>Prove your the one, by using this OTP sent below before it expires in <span>10 minutes</span>, to
    complete your request to change your password.
    </p>
    <p>PIN: <b>${pin}</b></p>
    <p>If you did not envoke this request, please ignore usage of the code sent, and
    let us know.</p>
    <p>If you have any questions, feel free to <a href="mailto:info@fixerfind.co" id="msg-link">reach
    out to us.</a>
    </p>
    </div>
    </div>
    </div>
    <hr />
    <footer>
    <div class="footer-body">
    <div class="footer-text">Copyright <span>&#169;</span> Alvaindes Limited. All Rights Reserved.</div>
    <div class="footer-text">To stop recieving messages from us, you can change your notification settings.
    </div>
    <div class="footer-text"><a href="mailto:info@fixerfind.co">info@fixerfind.co</a>| 07063455750</div>
    </div>
    </footer>
    </div>
   `
  };
  try {
    await transporter.sendMail(mailOption);
  } catch (error) {
    return error.message;
  }
};
