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
exports.Mailer = async (name, email, pin) => {
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
    from: process.env.GMAIL_USER,
    to: email,
    subject: `Registration Code`,
    html: `<html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RegVerification Code</title>
    <style>body{font-size:18px;background-color:#fff}.msg-textcon{display:flex;flex-direction:column;justify-content:center;align-items:center}.msg-textcon2{display:flex;flex-direction:column;justify-content:center;align-items:center;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif;padding:10%;height:auto}.company-name{font-family:"Arciform",'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;font-weight:300;margin-left:25px;transform:translateY(-100%);color:dodgerblue}#msg-logo{height:140px;width:200px;margin-left:20px;margin-top:20px}.msg-textheader{color:blue;font-family:Georgia,'Times New Roman',Times,serif}@font-face{font-family:"arciform";src:url("./Fonts/Arciform.ttf") format("truetype")}.tag{font-family:"Arciform",'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;font-weight:300}#msg-pic{margin-top:50px;width:30vw;border-radius:10px;box-shadow:.1px .5px #eee;opacity:.9}#msg-link{text-decoration:none}footer{background-color:#fff;display:flex;flex-direction:column;justify-content:center;align-items:center}.footer-body{padding:20px}.footer-text{font-size:small;font-family:'Gill Sans','Gill Sans MT',Calibri,'Trebuchet MS',sans-serif;margin:4px}@media(min-width:601px){.msg-textcon2{margin-left:100px;margin-right:100px}}@media(max-width:500px){body{font-size:15px}.msg-textheader{font-size:larger}.msg-textcon2{margin-left:20px;margin-right:20px;padding-top:20%;padding-bottom:15%}#msg-pic{margin-top:20px;width:70vw;border-radius:10px;box-shadow:.1px .5px #eee;opacity:.9}}</style>
    </head>
    <body>
    <div class="msg-body">
    <div class="msg-logocon">
    <img src="https://firebasestorage.googleapis.com/v0/b/projectmate-a0f82.appspot.com/o/logo%26name.jpeg?alt=media&token=864d6233-e6bd-4183-99c5-2c4d40132a1b" alt="FixerFind" id="msg-logo">
    </div>
    <hr />
    <div class="msg-textcon">
    <div class="msg-textcon2">
    <h4>Hi soon to be FixerFinder,</h4>
    <p>Prove your the one, by using this OTP sent below before in <span>10min</span>, to
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
    </body>
    </html>`
  };
  try {
    await transporter.sendMail(mailOption);
  } catch (error) {
    return error.message;
  }
};
exports.Success = async (name, email) => {
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
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Fixer Find auth",
    html: `Hey ${name} you have successfully join fixerfind congratulations!
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
exports.reset = async (name, email, pin) => {
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
    from: process.env.GMAIL_USER,
    to: email,
    subject: `Reset-Password Verification Code`,
    html: `<html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ResetPasswordVerification Code</title>
    <style>body{font-size:18px;background-color:#fff}.msg-textcon{display:flex;flex-direction:column;justify-content:center;align-items:center}.msg-textcon2{display:flex;flex-direction:column;justify-content:center;align-items:center;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif;padding:10%;height:auto}.company-name{font-family:"Arciform",'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;font-weight:300;margin-left:25px;transform:translateY(-100%);color:dodgerblue}#msg-logo{height:140px;width:200px;margin-left:20px;margin-top:20px}.msg-textheader{color:blue;font-family:Georgia,'Times New Roman',Times,serif}@font-face{font-family:"arciform";src:url("./Fonts/Arciform.ttf") format("truetype")}.tag{font-family:"Arciform",'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;font-weight:300}#msg-pic{margin-top:50px;width:30vw;border-radius:10px;box-shadow:.1px .5px #eee;opacity:.9}#msg-link{text-decoration:none}footer{background-color:#fff;display:flex;flex-direction:column;justify-content:center;align-items:center}.footer-body{padding:20px}.footer-text{font-size:small;font-family:'Gill Sans','Gill Sans MT',Calibri,'Trebuchet MS',sans-serif;margin:4px}@media(min-width:601px){.msg-textcon2{margin-left:100px;margin-right:100px}}@media(max-width:500px){body{font-size:15px}.msg-textheader{font-size:larger}.msg-textcon2{margin-left:20px;margin-right:20px;padding-top:20%;padding-bottom:15%}#msg-pic{margin-top:20px;width:70vw;border-radius:10px;box-shadow:.1px .5px #eee;opacity:.9}}</style>
    </head>
    <body>
    <div class="msg-body">
    <div class="msg-logocon">
    <img src="https://firebasestorage.googleapis.com/v0/b/projectmate-a0f82.appspot.com/o/logo%26name.jpeg?alt=media&token=864d6233-e6bd-4183-99c5-2c4d40132a1b" alt="FixerFind" id="msg-logo">
    </div>
    <hr />
    <div class="msg-textcon">
    <div class="msg-textcon2">
    <h4>Hi FixerFinder,</h4>
    <p>Prove your the one, by using this OTP sent below before in <span>10min</span>, to
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
    </body>
    </html>`
  };
  try {
    await transporter.sendMail(mailOption);
  } catch (error) {
    return error.message;
  }
};
