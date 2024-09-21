// Fetch a list of problems
export const getProblems = async (req, res) => {
    try {
      const problems = await Problem.find();
      res.json(problems);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };