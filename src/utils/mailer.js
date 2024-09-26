import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import crypto from "crypto";
export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    console.log(email, emailType, userId);
    const hashedToken = crypto.randomBytes(32).toString("hex");

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "3cb1e7fe42fb8e",
        pass: "80e51053e260a8",
      },
    });

    const mailOption = {
      from: "demo@gmail.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
      html: `<p>Click here <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">${emailType === "VERIFY" ? "Verify your Email" : "Reset your password"}</a></p>`,
    };

    const mailResponce = await transport.sendMail(mailOption);
    return mailResponce;
  } catch (error) {
    throw new Error(error);
  }
};
