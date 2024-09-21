// Fetch a specific problem by ID
export const getProblemById = async (req, res) => {
    const { problemId } = req.params;
    try {
      const problem = await Problem.findById(problemId);
      if (!problem) {
        return res.status(404).json({ message: 'Problem not found' });
      }
      res.json(problem);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };