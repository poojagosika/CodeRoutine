import user from "../../Model/userModel.js"; // Adjust the import path based on your project structure

// Add or update social links
export const addOrUpdateSocialLinks = async (req, res) => {
  try {
    const userId = req.id; // Ensure correct parameter name
    const newLinks = req.body;

    const userData = await user.findById(userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update social links directly
    userData.socialLinks = {
      ...userData.socialLinks,
      ...newLinks,
    };

    await userData.save();

    res.status(200).json({
      message: "Social links updated successfully",
      socialLinks: userData.socialLinks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// Delete a specific social link
export const deleteSocialLink = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { linkType } = req.params; // e.g., 'linkedin', 'github'

    const userData = await user.findById(userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!userData.socialLinks[linkType]) {
      return res
        .status(404)
        .json({ message: `Social link of type ${linkType} not found` });
    }

    userData.socialLinks[linkType] = "";
    await userData.save();

    res.status(200).json({
      message: "Social link deleted successfully",
      socialLinks: userData.socialLinks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};
