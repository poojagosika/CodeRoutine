import Submission from "../../Model/Problem/Submission.js";

export const getSubmissionHistory = async (req, res) => {
  const { problemId } = req.params;
  const userId = req.user._id;

  try {
    const submissions = await Submission.find({ userId, problemId }).sort({
      submissionTime: -1,
    });

    res.json({
      success: true,
      submissions,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
