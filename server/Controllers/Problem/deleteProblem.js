import Problem from "../../Model/Problem/problemModel.js";

// Controller to delete a problem by its ID
export const deleteProblem = async (req, res) => {
  try {
    const { id } = req.params; // Get problem ID from URL

    // Find the problem by ID and delete it
    const deletedProblem = await Problem.findByIdAndDelete(id);

    // If the problem is not found, return a 404 error
    if (!deletedProblem) {
      return res.status(404).json({
        message: "Problem not found",
      });
    }

    // Return a success response after deletion
    return res.status(200).json({
      message: "Problem deleted successfully",
      problem: {
        _id: deletedProblem._id,
        title: deletedProblem.title,
        createdAt: deletedProblem.createdAt,
        updatedAt: deletedProblem.updatedAt,
      }, // Optionally, you can return the deleted problem
    });
  } catch (error) {
    // Handle any other errors
    return res.status(500).json({
      message: "Failed to delete the problem",
      error: error.message,
    });
  }
};
