import Problem from "../../Model/Problem/problemModel.js";

// Controller to get a problem by its ID
export const getProblemById = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the problem by ID from the database
    const problem = await Problem.findById(id).select("-hiddenTestCases"); // Exclude hidden test cases

    // Check if the problem exists
    if (!problem) {
      return res.status(404).json({ message: "Problem not found." });
    }

    // Return the found problem
    return res
      .status(200)
      .json({ problem, message: "Problem fetched successfully" });
  } catch (error) {
    console.error(error);
    // Handle invalid ObjectID errors or other issues
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid Problem ID." });
    }
    res
      .status(500)
      .json({ message: "Error fetching problem.", error: error.message });
  }
};
