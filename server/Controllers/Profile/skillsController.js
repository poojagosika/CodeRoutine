import user from "../../Model/userModel.js"; // Adjust the import path based on your project structure

// Add a new skill
export const addSkill = async (req, res) => {
  try {
    const userId = req.id;
    const newSkill = req.body;

    const userData = await user.findById(userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    userData.skills.push(newSkill);
    await userData.save();

    res
      .status(201)
      .json({ message: "Skill added successfully", skills: userData.skills });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// Update an existing skill
export const updateSkill = async (req, res) => {
  try {
    const userId = req.id;
    const skillId = req.params.skillId;
    const updatedData = req.body;

    const userData = await user.findById(userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const skill = userData.skills.id(skillId);

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    Object.assign(skill, updatedData);
    await userData.save();

    res
      .status(200)
      .json({ message: "Skill updated successfully", skills: userData.skills });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// Delete a skill
export const deleteSkill = async (req, res) => {
  try {
    const userId = req.id;
    const skillId = req.params.skillId;

    const userData = await user.findById(userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const skill = userData.skills.id(skillId);

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    const index = userData.skills.indexOf(skill);
    userData.skills.splice(index, 1);
    await userData.save();

    res.status(200).json({ message: "Skill deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};
