import user from "../../Model/userModel.js";

// Add a new experience
export const addExperience = async (req, res) => {
  try {
    const userId = req.id;
    const newExperience = req.body;

    const existingUser = await user.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    existingUser.experience.push(newExperience);
    await existingUser.save();

    res.status(201).json({
      message: "Experience added successfully",
      experience: existingUser.experience,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// Update an existing experience
export const updateExperience = async (req, res) => {
  try {
    const userId = req.id;
    const experienceId = req.params.experienceId;
    const updatedData = req.body;

    const existingUser = await user.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const experience = existingUser.experience.id(experienceId);

    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    Object.assign(experience, updatedData);
    await existingUser.save();

    res.status(200).json({
      message: "Experience updated successfully",
      experience: existingUser.experience,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// Delete an experience
export const deleteExperience = async (req, res) => {
  try {
    const userId = req.id;
    const experienceId = req.params.experienceId;

    const existingUser = await user.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const experience = existingUser.experience.id(experienceId);

    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    const experienceIndex = existingUser.experience.indexOf(experience);
    existingUser.experience.splice(experienceIndex, 1);
    await existingUser.save();

    res.status(200).json({
      message: "Experience deleted successfully",
      experience: existingUser.experience,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};
