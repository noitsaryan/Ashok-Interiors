const nodemailer =  require("nodemailer");

async function orderMail(data){
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  });

  let mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: 'imailaryan01@gmail.com',
    subject: "New Order",
    text: data 
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (!error) {
      return res.json({
        success: true,
        message: "Email sent successfully!",
      });
    } else {
      console.error("Error sending email:", error);
      return res.json({
        success: false,
        message: "Error sending email",
      });
    }
  });
}

module.exports = {
    orderMail
}