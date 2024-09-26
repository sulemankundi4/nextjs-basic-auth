import { connectDB } from "../../../../dbConfig.js/dbConfig";
import User from "../../../../models/userModel";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/utils/getDataFromToken";

connectDB();

export const POST = async (req) => {
  try {
    const userId = await getDataFromToken(req);

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return NextResponse.json({ error: "You are not authorized to perform this action" }, { status: 401 });
    }
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
};
