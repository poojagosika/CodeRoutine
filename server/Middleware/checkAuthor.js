import user from "../Model/userModel.js";

export const checkAuthor = async (req, res, next) => {
  try {
    const isAuthor = await user.findOne({ userName: req.userName });
    if (!isAuthor) {
      return res.status(404).json({ message: "User not found" });
    }
    if (isAuthor.userName !== req.body.author) {
      return res
        .status(401)
        .json({ message: "You are not authorized to perform this action" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
