// Update an existing problem (Admin Only)
export const updateProblem = async (req, res) => {
    const { problemId } = req.params;
    const { title, description, difficulty, sampleTestCases } = req.body;
    try {
      const updatedProblem = await Problem.findByIdAndUpdate(
        problemId,
        { title, description, difficulty, sampleTestCases },
        { new: true }
      );
      res.json(updatedProblem);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };