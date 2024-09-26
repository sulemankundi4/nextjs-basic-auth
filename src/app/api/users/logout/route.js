import { connectDB } from "../../../../dbConfig.js/dbConfig";
import { NextResponse } from "next/server";

connectDB();

export const GET = async (req) => {
  try {
    const responce = NextResponse.json({
      message: "User logged Out successfully",
      success: true,
      token,
    });

    responce.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return responce;
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
};
