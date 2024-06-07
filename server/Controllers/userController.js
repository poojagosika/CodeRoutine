import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import user from "../Model/userModel.js";

export const userRegister = async (req, res) => {
  try {
    const { userName, password, confirmPassword, email } = req.body;
    const existinguserName = await user.findOne({ userName });
    if (existinguserName) {
      return res
        .status(409)
        .json({ message: "This username is already exists" });
    }
    const existingProfile = await user.findOne({ email });
    if (existingProfile) {
      return res.status(409).json({ message: "This email is already exists" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const passwordHash = await bcryptjs.hash(password, 10);
    const profile = await user.create({
      userName,
      email,
      password: passwordHash,
    });
    return res.status(201).json({ profile, message: "Welcome to CodeRoutine" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingProfile = await user.findOne({ email });
    if (!existingProfile) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcryptjs.compare(password, existingProfile.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { _id: existingProfile._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res
      .status(200)
      .json({ token, existingProfile, message: "Login successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
