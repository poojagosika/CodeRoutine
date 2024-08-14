import Progress from "../../../Model/ProgressModel.js";
// Delete Progress for a Course
export const deleteProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.params;
    const deletedProgress = await Progress.findOneAndDelete({
      userId,
      courseId,
    });

    if (!deletedProgress) {
      return res.status(404).json({ error: "Progress not found" });
    }

    res.status(200).json({ message: "Progress deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
