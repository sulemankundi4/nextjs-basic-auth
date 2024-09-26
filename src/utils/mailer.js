import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
      },
    });

    const mailOption = {
      from: "demo@gmail.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
      html: "<b>Hello world?</b>",
    };

    const mailResponce = await transporter.sendMail(mailOption);
    return mailResponce;
  } catch (error) {
    throw new Error(error);
  }
};
