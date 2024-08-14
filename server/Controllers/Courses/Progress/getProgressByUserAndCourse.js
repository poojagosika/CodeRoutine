import Progress from "../../../Model/ProgressModel.js";
// Get Progress by User and Course
export const getProgressByUserAndCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.params;
    const progress = await Progress.findOne({ userId, courseId });

    if (!progress) {
      return res.status(404).json({ error: "Progress not found" });
    }

    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
