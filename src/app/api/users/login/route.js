import { connectDB } from "../../../../dbConfig.js/dbConfig";
import User from "../../../../models/userModel";
import { NextResponse } from "next/server";

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

    return NextResponse.json({ message: "Email verified successfully", success: true }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
};
