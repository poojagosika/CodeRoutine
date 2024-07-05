import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import user from "../Model/userModel.js";

export const userRegister = async (req, res) => {
  try {
    const { userName, password, confirmPassword, email } = req.body;
    if (!userName || !password || !confirmPassword || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await user.findOne({ $or: [{ userName }, { email }] });
    if (existingUser) {
      const field = existingUser.userName === userName ? "userName" : "email";
      return res.status(409).json({ message: `This ${field} already exists` });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const passwordHash = await bcryptjs.hash(password, 10);
    const newUser = await user.create({
      userName,
      email,
      password: passwordHash,
    });
    return res.status(201).json({ newUser, message: "Welcome to CodeRoutine" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcryptjs.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { _id: existingUser._id, userName: existingUser.userName },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );
    // Only return the necessary user details
    const userData = {
      _id: existingUser._id,
      userName: existingUser.userName,
      email: existingUser.email,
      role: existingUser.role,
    };
    return res
      .status(200)
      .json({ token, user: userData, message: "Login successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const userUpdateProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      collegeName,
      companyName,
      website,
      socialAddresses,
      languages,
      skills,
      status,
      newPassword,
    } = req.body;

    const updatedData = {
      "profile.firstName": firstName,
      "profile.lastName": lastName,
      "profile.collegeName": collegeName,
      "profile.companyName": companyName,
      "profile.website": website,
      "profile.socialAddresses": socialAddresses,
      "profile.languages": languages,
      "profile.skills": skills,
      "profile.status": status,
    };

    if (newPassword) {
      const passwordHash = await bcryptjs.hash(newPassword, 10);
      updatedData.password = passwordHash;
    }

    const updatedUser = await user.findByIdAndUpdate(
      req.id,
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    return res
      .status(200)
      .json({ user: updatedUser, message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getUserByUserName = async (req, res) => {
  try {
    const { userName } = req.params;

    if (!userName) {
      return res.status(400).json({ message: "Username is required" });
    }

    const existingUser = await user.findOne({ userName });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...userData } = existingUser._doc;

    return res.status(200).json({ user: userData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
