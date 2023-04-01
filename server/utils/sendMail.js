import { createTransport } from "nodemailer";

export const sendMail = async (email, otp) => {
  var transport = createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  var mailOpts = {
    from: "verification@luminous.com",
    to: email,
    subject: "Account Verification",
    text: "Hi there! Your generated OTP is " + otp + ".",
  };

  await transport.sendMail(mailOpts, function (err, response) {
    if (err) {
      //ret.message = "Mail error.";
      console.log("Error: ", err);
    } else {
      //ret.message = "Mail send.";
      console.log("delivered");
    }
  });
};
