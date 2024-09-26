import { connectDB } from "../../../../dbConfig.js/dbConfig";
import { jwt } from "jsonwebtoken";

connectDB();

export const getDataFromToken = async (req) => {
  try {
    const token = req.cookies.get("token")?.value || "";

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    return decodedToken.id;
  } catch (e) {
    throw new Error(e);
  }
};
