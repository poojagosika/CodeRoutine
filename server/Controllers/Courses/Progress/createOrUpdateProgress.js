import Progress from "../../../Model/ProgressModel.js";

// Create or Update Progress for a Course
export const createOrUpdateProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    // Find the existing progress for the user and course
    let progress = await Progress.findOne({ userId, courseId });

    if (progress) {
      // Update existing progress
      progress = await Progress.findByIdAndUpdate(progress._id, req.body, {
        new: true,
      });
    } else {
      // Create new progress
      progress = new Progress(req.body);
      await progress.save();
    }

    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
