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
exports.Mailer = async (email, pin) => {
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
    <img src="https://firebasestorage.googleapis.com/v0/b/projectmate-a0f82.appspot.com/o/logo%26name.jpeg?alt=media&token=864d6233-e6bd-4183-99c5-2c4d40132a1b" alt="FixerFind" style=" height: 140px;
    width: 200px;
    margin-left: 20px;
    margin-top: 20px;">
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
exports.Success = async (email) => {
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
    <div style="font-size:15px;background-color:#fff">
    <div>
    <div style="position:relative;display:flex;justify-content:center;align-items:center">
    <img src="https://firebasestorage.googleapis.com/v0/b/projectmate-a0f82.appspot.com/o/ads3.jpeg?alt=media&token=c4021cd6-3c93-4c55-a71e-cf1df26b7f77" alt="FixerFind" style="height:125px;width:300px;margin-top:20px">
    </div>
    <hr />
    <div style="display:flex;flex-direction:column;justify-content:center;align-items:center">
    <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;color:#eee;background-color:dodgerblue;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif;padding:10%;height:auto;border-radius:20px;box-shadow:.5px 2px 2px 0 #404040">
    <h4>Hey FixerFinder,</h4>
    <p>Congratulations! We're glad to have you in our community, all your benefits are just beginning.😎
    </p>
    <p>Keep in mind, you can also become a Service Provider yourself and render your services in the
    community to customers at your rate.😁💵</p>
    <p>Do this easily by simply going to our app, click on "Settings", then click on "Become a Service
    Provider" and follow the quick instructions.</p>
    <p>If you have any questions, feel free to <a href="mailto:info@fixerfind.co" style="color:#002;text-decoration:none">reach
    out to us.</a>
    </p>
    <p>With us, it's a win! win!!</p>
    <div style="display:flex;flex-direction:column;justify-content:center;align-items:center">
    <img src="https://firebasestorage.googleapis.com/v0/b/projectmate-a0f82.appspot.com/o/ffweb2.jpeg?alt=media&token=b612c500-f874-4634-83b7-ef6dd583438d" alt="" style="margin-top:20px;width:70vw;border-radius:10px;box-shadow:.1px .5px #eee;opacity:.9">
    </div>
    </div>
    </div>
    </div>
    </div>
    <hr />
    <div style="background-color:#fff;display:flex;flex-direction:column;justify-content:center;align-items:center">
    <div style="padding:20px">
    <div style="position:relative;display:flex;justify-content:center;align-items:center">
    <img src="https://firebasestorage.googleapis.com/v0/b/projectmate-a0f82.appspot.com/o/logo%26name.jpeg?alt=media&token=864d6233-e6bd-4183-99c5-2c4d40132a1b" alt="FixerFind" style="height:100px;width:150px">
    </div>
    <div style="font-size:small;font-family:'Gill Sans','Gill Sans MT',Calibri,'Trebuchet MS',sans-serif;margin:4px">Copyright <span>&#169;</span> Alvaindes Limited. All Rights Reserved.</div>
    <div style="font-size:small;font-family:'Gill Sans','Gill Sans MT',Calibri,'Trebuchet MS',sans-serif;margin:4px">
    To stop recieving messages from us, you can change your notification settings.
    </div>
    <div style="font-size:small;font-family:'Gill Sans','Gill Sans MT',Calibri,'Trebuchet MS',sans-serif;margin:4px">
    <a href="mailto:info@fixerfind.co">info@fixerfind.co</a>|
    <a href="tel:+234-706-345-5750">07063455750</a>
    </div>
    </div>
    </div> `,
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
exports.reset = async (email, pin) => {
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
    <div style="font-size:15px;background-color:#fff">
    <div>
    <div>
    <img src="https://firebasestorage.googleapis.com/v0/b/projectmate-a0f82.appspot.com/o/logo%26name.jpeg?alt=media&token=864d6233-e6bd-4183-99c5-2c4d40132a1b" alt="FixerFind" style="height:140px;width:200px;margin-left:20px;margin-top:20px">
    </div>
    <hr />
    <div style="display:flex;flex-direction:column;justify-content:center;align-items:center">
    <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif;padding:10%;height:auto">
    <h4>Hi FixerFinder,</h4>
    <p>Prove your the one, by using this OTP sent below before it expires in <span>10 minutes</span>, to
    complete your request to change your password.
    </p>
    <p>PIN: <b>${pin}</b></p>
    <p>If you did not envoke this request, please ignore usage of the code sent, and
    let us know.</p>
    <p>If you have any questions, feel free to <a href="mailto:info@fixerfind.co" style="text-decoration:none">reach
    out to us.</a>
    </p>
    </div>
    </div>
    </div>
    </div>
    <hr />
    <footer style="background-color:#fff;display:flex;flex-direction:column;justify-content:center;align-items:center">
    <div style="padding:20px">
    <div style="font-size:small;font-family:'Gill Sans','Gill Sans MT',Calibri,'Trebuchet MS',sans-serif;margin:4px">Copyright <span>&#169;</span> Alvaindes Limited. All Rights Reserved.</div>
    <div style="font-size:small;font-family:'Gill Sans','Gill Sans MT',Calibri,'Trebuchet MS',sans-serif;margin:4px">
    To stop recieving messages from us, you can change your notification settings.
    </div>
    <div style="font-size:small;font-family:'Gill Sans','Gill Sans MT',Calibri,'Trebuchet MS',sans-serif;margin:4px">
    <a href="mailto:info@fixerfind.co">info@fixerfind.co</a>|
    <a href="tel:+234-706-345-5750">07063455750</a>
    </div>
    </div>
    </footer>
   `  };
  try {
    await transporter.sendMail(mailOption);
  } catch (error) {
    return error.message;
  }
};
