require("dotenv").config();
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");

const options = {
  auth: {
    api_key: process.env.SEND_GRID_KEY
  }
};
const mailer = nodemailer.createTransport(sgTransport(options));

const sendEmail = user => {
  const text = `
  Dear ${user.lastname},
    You have registered successfully at Airbnb.
    
    Thank you for choosing us!
    
  Best regards,
  WEB322-Airbnb Admin`;

  const html = `
  <p>Dear ${user.lastname},<br>
    &nbsp;&nbsp;&nbsp;&nbsp;You have registered successfully at Airbnb.<br>
    &nbsp;&nbsp;&nbsp;&nbsp;Thank you for choosing us!
  </p>
  <p>
  Best regards,<br>
  WEB322-Airbnb Admin
  </p>
  `;
  const emailInfo = {
    to: user.email,
    from: process.env.SERVER_EMAIL,
    subject: "Web322-Airbnb Registration Successfully",
    text,
    html
  };

  mailer.sendMail(emailInfo, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Message sent: ${info.response}`);
    }
  });
};

module.exports = sendEmail;
