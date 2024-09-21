import Problem from "../../Model/Problem/problemModel.js";

// Create a new problem (Admin only)
export const createProblem = async (req, res) => {
  // Extract the data from the request body
  const {
    title,
    description,
    difficulty,
    tags,
    inputFormat,
    outputFormat,
    constraints,
    sampleTestCases,
    hiddenTestCases,
    timeLimit,
    memoryLimit,
    codeTemplate,
  } = req.body;
  try {
    // Validate the required fields
    if (
      !title ||
      !description ||
      !difficulty ||
      !inputFormat ||
      !outputFormat ||
      !constraints ||
      !timeLimit ||
      !memoryLimit ||
      !codeTemplate
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided." });
    }

    // Validate difficulty
    const validDifficulties = ["Easy", "Medium", "Hard"];
    if (!validDifficulties.includes(difficulty)) {
      return res.status(400).json({ message: "Invalid difficulty level." });
    }

    // Ensure that sample and hidden test cases are arrays with valid structure
    if (!Array.isArray(sampleTestCases) || !Array.isArray(hiddenTestCases)) {
      return res
        .status(400)
        .json({ message: "Sample and hidden test cases must be arrays." });
    }

    if (sampleTestCases.length === 0 || hiddenTestCases.length === 0) {
      return res
        .status(400)
        .json({ message: "Sample and hidden test cases must not be empty." });
    }

    // Check if a problem with the same title already exists
    const existingProblem = await Problem.findOne({ title });
    if (existingProblem) {
      return res
        .status(400)
        .json({ message: "A problem with this title already exists." });
    }

    // Create a new problem
    const newProblem = new Problem({
      title,
      description,
      difficulty,
      tags,
      inputFormat,
      outputFormat,
      constraints,
      sampleTestCases,
      hiddenTestCases,
      timeLimit,
      memoryLimit,
      codeTemplate,
    });

    // Save the problem to the database
    await newProblem.save();

    // Return success response
    res.status(201).json({
      message: "Problem created successfully.",
      problem: newProblem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error.",
    });
  }
};
