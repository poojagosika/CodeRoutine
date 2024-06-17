import Jwt from "jsonwebtoken";

export const tokenVerify = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Note the space after "Bearer"
  console.log(`Token: ${token}`);

  if (!token) {
    return res.status(401).json({ message: "Please try to login" });
  }

  try {
    const decoded = Jwt.verify(token, process.env.JWT_SECRET);
    req.id = decoded._id;
    next();
  } catch (error) {
    console.error(`Token verification error: ${error}`);
    return res.status(401).json({ message: "Please try to login" });
  }
};
