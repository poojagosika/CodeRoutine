import Problem from "../Model/Problem/problemModel.js";

export const getAllProblem = async (req, res) => {
  try {
    const problems = await Problem.find();
    const problemsData = problems.map((problem) => {
      return {
        title: problem.title,
        solution: problem.solution,
        difficulty: problem.difficulty,
        id: problem._id,
      };
    });
    return res.status(200).json({ problemsData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
export const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    return res
      .status(200)
      .json({ problem, message: "Problem fetched successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateProblem = async (req, res) => {
  try {
    const findProblem = await Problem.findById(req.params.id);
    if (!findProblem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    const problem = await Problem.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res
      .status(200)
      .json({ problem, message: "Problem updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteProblem = async (req, res) => {
  try {
    const problem = await Problem.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ problem, message: "Problem deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
