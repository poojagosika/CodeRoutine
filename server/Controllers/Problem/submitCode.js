import Problem from "../../Model/Problem/problemModel.js";
import Submission from "../../Model/Problem/Submission.js";
import { runCode } from "../../utils/codeExecutor.js";

export const submitCode = async (req, res) => {
  const { problemId } = req.params;
  const { code, language } = req.body; // User's function code and selected language
  const userId = req.user._id; // Assuming user is authenticated and we have their ID

  try {
    const problem = await Problem.findById(problemId);

    // Execute the user's code with the test case
    const result = await runCode(
      code,
      problem.sampleTestCases[0].input,
      language
    );

    const newSubmission = new Submission({
      userId,
      problemId,
      code,
      language,
      result: result.success ? "pass" : "fail", // Based on whether the code passes or fails
      executionTime: result.executionTime,
      memoryUsed: result.memoryUsed,
    });

    // Save submission history
    await newSubmission.save();

    res.json({
      success: true,
      message: "Submission recorded successfully",
      submissionId: newSubmission._id,
      result: newSubmission.result,
      executionTime: newSubmission.executionTime,
      memoryUsed: newSubmission.memoryUsed,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
