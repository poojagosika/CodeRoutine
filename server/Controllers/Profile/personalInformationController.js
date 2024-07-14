import user from "../../Model/userModel.js";
export const personalInformationUpdate = async (req, res) => {
  try {
    const userId = req.id; // Extract the user ID from the request parameters
    const updateData = req.body; // Extract the new data from the request body

    // Find the user by ID and update their personal information
    const updatedUser = await user.findByIdAndUpdate(
      userId,
      { profile: updateData }, // Update the profile field with new data
      { new: true, runValidators: true } // Return the updated document and run validators
    );
    // If the user is not found, return a 404 error
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return a 200 status code and the updated user
    res.status(200).json({
      message: "Personal information updated successfully",
      personalInformation: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", error });
  }
};
