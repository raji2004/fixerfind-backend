const nodeMail = require("nodemailer");

exports.validateMail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);
}
exports.has31DaysPassed = (date1, date2) =>{
  const differenceInMilliseconds = date2 - date1;
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
 return differenceInDays >= 31;
}
exports.validatelength = (number, min, max) => {
  //   console.log(String(number).length);
  //   console.log(number)
  return String(number).length >= min && String(number).length <= max;
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
    subject: `Registration & Verification Code`,
    html: `
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Registration & Verification Code</title>
<style type="text/css">@media(max-width:600px){body{font-size:small}}</style>
</head>
<body style="margin:0;padding:0;border:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background-color:#dbdada;font-size:larger;max-width:900px;margin:0 auto;padding:3%;text-align:center">
<div class="wrapper" style="margin:0;padding:0;border:0;padding:10%;background-color:#fff!important">
<header style="margin:0;padding:0;border:0;width:98%">
<div id="logo" style="margin:0;padding:0;border:0;max-width:120px;margin:3% 0 3% 3%;float:left">
<img src="https://firebasestorage.googleapis.com/v0/b/projectmate-a0f82.appspot.com/o/logo%26name.jpeg?alt=media&token=864d6233-e6bd-4183-99c5-2c4d40132a1b" alt="FixerFind" style="margin:0;padding:0;border:0;max-width:100%" />
</div>
</header>
<hr class="hr1" style="margin:0;padding:0;border:0;height:1px;background-color:#3038409c;clear:both;width:96%;margin:auto;margin-bottom:10%">
<div class="one-col" style="margin:0;padding:0;border:0">
<div class="space" style="margin:0;padding:0;border:0;margin:35px 0">
<h4 style="margin:0;padding:0;border:0;margin:5%">Hey soon to be FixerFinder,</h4>
</div>
<div class="space" style="margin:0;padding:0;border:0;margin:35px 0">
<p style="margin:0;padding:0;border:0;margin:5%">Prove your the one, by using this OTP sent below
before <br style="margin:0;padding:0;border:0"> it expires in 10 minutes, to
complete your Registration.
</p>
</div>
<div class="space" style="margin:0;padding:0;border:0;margin:35px 0">
<p style="margin:0;padding:0;border:0;margin:5%">PIN: <b style="margin:0;padding:0;border:0">${pin}</b></p>
</div>
<div class="space" style="margin:0;padding:0;border:0;margin:35px 0">
<p style="margin:0;padding:0;border:0;margin:5%">If you have any questions, <br style="margin:0;padding:0;border:0">
feel free to <a href="mailto:info@fixerfind.co" style="margin:0;padding:0;border:0;text-decoration:none">reach
out to us.</a>
</p>
</div>
<hr class="hr2" style="margin:0;padding:0;border:0;height:1px;background-color:#3038409c;clear:both;width:96%;margin:auto;margin-top:10%">
<footer style="margin:0;padding:0;border:0">
<div id="contact" style="margin:0;padding:0;border:0;text-align:center;padding-bottom:3%;line-height:16px;color:#303840;margin-top:3%;font-size:13px">
<div style="margin:0;padding:0;border:0">Copyright <span style="margin:0;padding:0;border:0">&#169;</span> Alvaindes Limited. <br style="margin:0;padding:0;border:0">
All Rights Reserved.</div>
<div style="margin:0;padding:0;border:0">
To stop recieving messages from us, <br style="margin:0;padding:0;border:0"> you can change
your notification settings.
</div>
<div style="margin:0;padding:0;border:0">
<a href="mailto:info@fixerfind.co" style="margin:0;padding:0;border:0">info@fixerfind.co</a>|
<a href="tel:+234-706-345-5750" style="margin:0;padding:0;border:0">07063455750</a>
</div>
</div>
</footer>
</div>
</div>
</body>
</html>    `
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
    subject: "Welcome To FixerFInd",
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome To FixerFind</title>
    </head>
    <body style="margin:0;padding:0;border:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background-color:#dbdada;font-size:medium;max-width:800px;margin:0 auto;padding:3%;text-align:center">
    <div class="wrapper" style="margin:0;padding:0;border:0;background-color:#f7f7f7">
    <div id="banner" style="margin:0;padding:0;border:0">
    <img src="https://firebasestorage.googleapis.com/v0/b/projectmate-a0f82.appspot.com/o/ads1.jpeg?alt=media&token=2e01ed31-7fa3-43df-bdbe-fc65afcbce72" alt="" style="margin:0;padding:0;border:0;max-width:100%" />
    </div>
    <hr style="margin:0;padding:0;border:0;height:1px;background-color:#303840;clear:both;width:96%;margin:5% auto">
    <div class="wrapper-dodgerblue" style="margin:0;padding:0;border:0;background-color:dodgerblue;color:#fff;border-radius:10px;padding:20px">
    <div class="one-col" style="margin:0;padding:0;border:0">
    <div class="space" style="margin:0;padding:0;border:0;margin:50px 0">
    <h4 style="margin:0;padding:0;border:0;margin:3%">Hey FixerFinder,</h4>
    </div>
    <div class="space" style="margin:0;padding:0;border:0;margin:50px 0">
    <p style="margin:0;padding:0;border:0;margin:3%">Congratulations! We're glad to have you in our
    community, all your benefits are just
    beginning.😎
    </p>
    </div>
    <div class="space" style="margin:0;padding:0;border:0;margin:50px 0">
    <p style="margin:0;padding:0;border:0;margin:3%">Keep in mind, you can also become a Service
    Provider yourself and render your services in the
    community to customers at your rate.😁💵</p>
    </div>
    <div class="space" style="margin:0;padding:0;border:0;margin:50px 0">
    <p style="margin:0;padding:0;border:0;margin:3%">Do this simply by going to our app, click on
    "Settings", then click on "Become a Service
    Provider" and follow the quick instructions.</p>
    </div>
    <div class="space" style="margin:0;padding:0;border:0;margin:50px 0">
    <p style="margin:0;padding:0;border:0;margin:3%">With us, it's a win! win!!</p>
    </div>
    <div class="space" style="margin:0;padding:0;border:0;margin:50px 0">
    <img src="https://firebasestorage.googleapis.com/v0/b/projectmate-a0f82.appspot.com/o/ffweb2.jpeg?alt=media&token=b612c500-f874-4634-83b7-ef6dd583438d" alt="" style="margin:0;padding:0;border:0;max-width:100%;margin-top:20px;width:70vw;border-radius:10px;box-shadow:.1px .5px #eee;opacity:.9">
    </div>
    <div class="space" style="margin:0;padding:0;border:0;margin:50px 0">
    <p style="margin:0;padding:0;border:0;margin:3%">If you have any questions, feel free to <a href="mailto:info@fixerfind.co" style="margin:0;padding:0;border:0;color:#002;text-decoration:none">reach
    out to us.</a>
    </p>
    </div>
    </div>
    </div>
    <hr style="margin:0;padding:0;border:0;height:1px;background-color:#303840;clear:both;width:96%;margin:5% auto">
    <footer style="margin:0;padding:0;border:0">
    <div id="contact" style="margin:0;padding:0;border:0;text-align:center;padding-bottom:3%;line-height:16px;font-size:15px;color:#303840">
    <div class="space-small" style="margin:0;padding:0;border:0;margin:10px 0">
    <img src="https://firebasestorage.googleapis.com/v0/b/projectmate-a0f82.appspot.com/o/logo%26name.jpeg?alt=media&token=864d6233-e6bd-4183-99c5-2c4d40132a1b" alt="FixerFind" style="margin:0;padding:0;border:0;max-width:25vw" />
    </div>
    <p class="space-small" style="margin:0;padding:0;border:0;margin:3%;margin:10px 0">Copyright <span style="margin:0;padding:0;border:0">&#169;</span> Alvaindes Limited. <br style="margin:0;padding:0;border:0">
    All Rights
    Reserved.</p>
    <p class="space-small" style="margin:0;padding:0;border:0;margin:3%;margin:10px 0">
    To stop recieving messages from us, <br style="margin:0;padding:0;border:0">you can change your
    notification settings.
    </p>
    <p class="space-small" style="margin:0;padding:0;border:0;margin:3%;margin:10px 0">
    <a href="mailto:info@fixerfind.co" style="margin:0;padding:0;border:0">info@fixerfind.co</a>|
    <a href="tel:+234-706-345-5750" style="margin:0;padding:0;border:0">07063455750</a>
    </p>
    </div>
    </footer>
    </div>
    </body>
    </html> `,
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
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset-Password Verification Code</title>
    <style type="text/css">@media(max-width:600px){body{font-size:small}}</style>
    </head>
    <body style="margin:0;padding:0;border:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background-color:#dbdada;font-size:larger;max-width:900px;margin:0 auto;padding:3%;text-align:center">
    <div class="wrapper" style="margin:0;padding:0;border:0;padding:10%;background-color:#fff!important">
    <header style="margin:0;padding:0;border:0;width:98%">
    <div id="logo" style="margin:0;padding:0;border:0;max-width:120px;margin:3% 0 3% 3%;float:left">
    <img src="https://firebasestorage.googleapis.com/v0/b/projectmate-a0f82.appspot.com/o/logo%26name.jpeg?alt=media&token=864d6233-e6bd-4183-99c5-2c4d40132a1b" alt="FixerFind" style="margin:0;padding:0;border:0;max-width:100%" />
    </div>
    </header>
    <hr class="hr1" style="margin:0;padding:0;border:0;height:1px;background-color:#3038409c;clear:both;width:96%;margin:auto;margin-bottom:10%">
    <div class="one-col" style="margin:0;padding:0;border:0">
    <div class="space" style="margin:0;padding:0;border:0;margin:35px 0">
    <h4 style="margin:0;padding:0;border:0;margin:5%">Hi FixerFinder,</h4>
    </div>
    <div class="space" style="margin:0;padding:0;border:0;margin:35px 0">
    <p style="margin:0;padding:0;border:0;margin:5%">Prove your the one, by using this OTP sent below
    before it expires in 10 minutes, to
    complete your request to change your password.
    </p>
    </div>
    <div class="space" style="margin:0;padding:0;border:0;margin:35px 0">
    <p style="margin:0;padding:0;border:0;margin:5%">PIN: <b style="margin:0;padding:0;border:0">${pin}</b></p>
    </div>
    <div class="space" style="margin:0;padding:0;border:0;margin:35px 0">
    <p style="margin:0;padding:0;border:0;margin:5%">If you did not envoke this request, please ignore
    <br style="margin:0;padding:0;border:0">
    usage of the code sent, and
    let us know.
    </p>
    </div>
    <div class="space" style="margin:0;padding:0;border:0;margin:35px 0">
    <p style="margin:0;padding:0;border:0;margin:5%">If you have any questions, <br style="margin:0;padding:0;border:0">
    feel free to <a href="mailto:info@fixerfind.co" style="margin:0;padding:0;border:0;text-decoration:none">reach
    out to us.</a>
    </p>
    </div>
    <hr class="hr2" style="margin:0;padding:0;border:0;height:1px;background-color:#3038409c;clear:both;width:96%;margin:auto;margin-top:10%">
    <footer style="margin:0;padding:0;border:0">
    <div id="contact" style="margin:0;padding:0;border:0;text-align:center;padding-bottom:3%;line-height:16px;color:#303840;margin-top:3%;font-size:13px">
    <div style="margin:0;padding:0;border:0">Copyright <span style="margin:0;padding:0;border:0">&#169;</span> Alvaindes Limited. <br style="margin:0;padding:0;border:0">
    All Rights Reserved.</div>
    <div style="margin:0;padding:0;border:0">
    To stop recieving messages from us, <br style="margin:0;padding:0;border:0"> you can change
    your notification settings.
    </div>
    <div style="margin:0;padding:0;border:0">
    <a href="mailto:info@fixerfind.co" style="margin:0;padding:0;border:0">info@fixerfind.co</a>|
    <a href="tel:+234-706-345-5750" style="margin:0;padding:0;border:0">07063455750</a>
    </div>
    </div>
    </footer>
    </div>
    </div>
    </body>
    </html>
   `  };
  try {
    await transporter.sendMail(mailOption);
  } catch (error) {
    return error.message;
  }
};
