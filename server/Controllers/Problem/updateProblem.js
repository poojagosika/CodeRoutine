import Problem from "../../Model/Problem/problemModel.js";

// Controller to update an existing problem by ID
export const updateProblem = async (req, res) => {
  try {
    const { id } = req.params; // Get problem ID from URL
    const updatedData = req.body; // Get the updated problem data from request body

    // Find the problem by ID and update it with new data
    const updatedProblem = await Problem.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true } // Ensure updated document is returned and validation is applied
    );

    // If no problem is found
    if (!updatedProblem) {
      return res.status(404).json({
        message: "Problem not found",
      });
    }

    // Return the updated problem with a success message
    return res.status(200).json({
      message: "Problem updated successfully",
      problem: updatedProblem,
    });
  } catch (error) {
    // Handle uniqueness error for title
    if (error.code === 11000 && error.keyValue && error.keyValue.title) {
      return res.status(400).json({
        message: `Problem with title "${error.keyValue.title}" already exists. Title must be unique.`,
      });
    }

    // Handle other errors and return response
    return res.status(500).json({
      message: "Failed to update the problem",
      error: error.message,
    });
  }
};
