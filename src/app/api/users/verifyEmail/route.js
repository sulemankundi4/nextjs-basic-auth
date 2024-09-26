import { connectDB } from "../../../../dbConfig.js/dbConfig";
import User from "../../../../models/userModel";
import { NextResponse } from "next/server";

connectDB();

export const POST = async (req) => {
  try {
    const reqBody = await req.json();

    const { token } = reqBody;
    console.log(token);

    const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });

    if (!user) {
      return NextResponse.json({ error: "Token is invalid" }, { status: 400 });
    }

    console.log(user);

    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    user.isVerified = true;

    await user.save();

    return NextResponse.json({ message: "Email verified successfully", success: true }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
};
