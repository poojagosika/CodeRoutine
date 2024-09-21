// Delete a problem (Admin Only)
export const deleteProblem = async (req, res) => {
    const { problemId } = req.params;
    try {
      await Problem.findByIdAndDelete(problemId);
      res.json({ message: 'Problem deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };