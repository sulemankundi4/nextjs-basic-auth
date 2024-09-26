import { connectDB } from "../../../../dbConfig.js/dbConfig";
import User from "../../../../models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
connectDB();

export const POST = async (req) => {
  try {
    const reqBody = await req.json();

    const { email, password } = reqBody;
    console.log(email, password);

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (!isMatch) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
      }
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    const responce = NextResponse.json({
      message: "User logged in successfully",
      success: true,
      token,
    });

    responce.cookies.set("token", token, {
      httpOnly: true,
    });

    return responce;
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
};
