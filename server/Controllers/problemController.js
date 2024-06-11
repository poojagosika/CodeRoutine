import Problem from "../Model/problemModel.js";

export const addPoblem = async (req, res) => {
  console.log(req.body);
  try {
    const {
      title,
      description,
      inputDescription,
      outputDescription,
      constraints,
      examples,
      tags,
      difficulty,
      author,
    } = req.body;
    const problem = await Problem.create({
      title,
      description,
      inputDescription,
      outputDescription,
      constraints,
      examples,
      tags,
      difficulty,
      author,
    });
    return res
      .status(201)
      .json({ problem, message: "Problem added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
export const getPoblem = async (req, res) => {};
