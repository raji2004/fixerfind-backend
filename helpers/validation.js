const nodeMail = require("nodemailer");

exports.validateMail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);
};
exports.validatelength = (number, m) => {
  //   console.log(String(number).length);
  //   console.log(number)
  return String(number).length === m ? true : false;
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
    subject: "Fixer Find auth",
    html: `Hey ${name} you recently requested to join Fixer find 
    here is your pin:
    ${pin} `,
  };
  try {
    await transporter.sendMail(mailOption);
  } catch (error) {
    return error.message;
  }
};

exports.randNum = () => {
  return Math.floor(1000 + Math.random() * 9000);
};
