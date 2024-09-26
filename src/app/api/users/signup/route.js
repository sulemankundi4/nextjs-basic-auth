import next from "next";
import { connectDB } from "../../../../dbConfig.js/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/userModel";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/utils/mailer";
connectDB();

export const POST = async (NextRequest, NextResponse) => {
  try {
    const reqBody = NextRequest.json();
    const { email, userName, password } = reqBody;

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json({ error: "User already exists" }, 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      email,
      userName,
      password: hashedPassword,
    });

    await newUser.save();
    console.log(newUser);

    await sendEmail({
      email,
      emailType: "VERIFY",
      userId: newUser._id,
    });

    return NextResponse.json({ message: "User created successfully", success: true }, 201);
  } catch (e) {
    return NextResponse.json({ error: e.message }, 500);
  }
};
