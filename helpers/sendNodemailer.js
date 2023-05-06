//  -- For example sen Email with nodemailer -----------------//

const nodemailer = require("nodemailer");

const {META_PASSWORD} = process.env;

const sendNodemailer = async (data) => {
    const email = {...data, from: "taraniuk88@meta.ua"};
    const nodemailerConfig = {
        host: "smtp.meta.ua",
        port: 465,
        secure: true,
        auth: {
          user: "taraniuk88@meta.ua",
          pass: META_PASSWORD
        }
      };
      
      const transport = nodemailer.createTransport(nodemailerConfig);

    await transport.sendMail(email)
    .then(() => console.log("Email send"))
    .catch(error => console.log(error.message));

    return true;
}

// const data = {
//   to: "taranyk88@ukr.net",
//   from: "taraniuk88@meta.ua",
//   subject: "Test email",
//   html: "<p><strong>Test email</strong> from localhost:3000</p>"
// }

module.exports = sendNodemailer;