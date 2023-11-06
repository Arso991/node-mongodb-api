const nodemailer = require("nodemailer");

const mailer = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "136595675038af",
    pass: "5e433a9735f35b"
  },
});

module.exports = mailer
