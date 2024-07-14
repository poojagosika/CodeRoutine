import user from "../../Model/userModel.js";

// Add a new education
export const addEducation = async (req, res) => {
  try {
    const userId = req.id;
    const newEducation = req.body;

    const existingUser = await user.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    existingUser.education.push(newEducation);
    await existingUser.save();

    res.status(201).json({
      message: "Education added successfully",
      education: existingUser.education,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// Update an existing education
export const updateEducation = async (req, res) => {
  try {
    const userId = req.id;
    const educationId = req.params.educationId;
    const updatedData = req.body;

    const existingUser = await user.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const education = existingUser.education.id(educationId);

    if (!education) {
      return res.status(404).json({ message: "Education not found" });
    }

    Object.assign(education, updatedData);
    await existingUser.save();

    res.status(200).json({
      message: "Education updated successfully",
      education: existingUser.education,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// Delete an education
export const deleteEducation = async (req, res) => {
  try {
    const userId = req.id;
    const educationId = req.params.educationId;

    const existingUser = await user.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const education = existingUser.education.id(educationId);

    if (!education) {
      return res.status(404).json({ message: "Education not found" });
    }

    const index = existingUser.education.indexOf(education);
    existingUser.education.splice(index, 1);
    await existingUser.save();

    res.status(200).json({
      message: "Education deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};
