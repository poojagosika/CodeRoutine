import Progress from "../../../Model/ProgressModel.js";
// Get All Progress for a User
export const getAllProgressByUser = async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.params.userId });
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
