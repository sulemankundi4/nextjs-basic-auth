import { connectDB } from "../../../../dbConfig.js/dbConfig";
import User from "../../../../models/userModel";
import { NextResponse } from "next/server";
import { getDataFromToken } from "../../../../utils/getDataFromToken";

connectDB();

export const POST = async (req) => {
  try {
    console.log("coming here");
    const userId = await getDataFromToken(req);
    console.log(userId);
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return NextResponse.json({ error: "You are not authorized to perform this action" }, { status: 401 });
    }

    return NextResponse.json({ data: user, message: "Your Profile Data" }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
};
