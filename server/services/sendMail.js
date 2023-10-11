const nodemailer =  require("nodemailer");

async function sendMail(link, name, email) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  });

  let mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "Reset Password",
    html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
            <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td style="padding: 20px;">
                        <table cellpadding="10" cellspacing="0" width="100%">
                            <tr>
                                <td align="center">
                                    <img src="https://ashok-interiors.vercel.app/_next/image?url=%2Fmainlogo.png&w=750&q=75" alt="Company Logo" width="150" style="display: block; margin: 0 auto;">
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table cellpadding="20" cellspacing="0" width="100%">
                            <tr>
                                <td>
                                    <h2 style="font-size:24px; color:#202020 " >Hello ${name},</h2>
                                    <p>We received a request to reset your password. To proceed, please click the link below:</p>
                                    <p><a href="${link}" style="color: #6B8EAE; text-decoration: none;">Reset Password</a></p>
                                    <p>If you didn't request this password reset, you can ignore this email.</p>
                                    <p>Thank you for using our service!</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#6B8EAE" style="padding: 10px;">
                        <table cellpadding="10" cellspacing="0" width="100%">
                            <tr>
                                <td align="center">
                                    <p style="color: #fff;">&copy; 2023 Ashok Interiors. All rights reserved.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        
        `,
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
    sendMail
}