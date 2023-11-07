const nodemailer = require("nodemailer");

const mailer = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "itoshi147@gmail.com",
    pass: "hhodekcsuyshwbrg"
  },
});

module.exports = mailer
