import jwt from "jsonwebtoken";

export const getDataFromToken = async (req) => {
  try {
    const token = req.cookies.get("token")?.value || "";

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    return decodedToken.id;
  } catch (e) {
    throw new Error(e);
  }
};
