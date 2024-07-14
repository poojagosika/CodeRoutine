import user from "../../Model/userModel.js";

// Add a new training
export const addTraining = async (req, res) => {
  try {
    const userId = req.id;
    const newTraining = req.body;

    const existingUser = await user.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    existingUser.training.push(newTraining);
    await existingUser.save();

    res.status(201).json({
      message: "Training added successfully",
      training: existingUser.training,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// Update an existing training
export const updateTraining = async (req, res) => {
  try {
    const userId = req.id;
    const trainingId = req.params.trainingId;
    const updatedData = req.body;

    const existingUser = await user.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const training = existingUser.training.id(trainingId);

    if (!training) {
      return res.status(404).json({ message: "Training not found" });
    }

    Object.assign(training, updatedData);
    await existingUser.save();

    res.status(200).json({
      message: "Training updated successfully",
      training: existingUser.training,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// Delete a training
export const deleteTraining = async (req, res) => {
  try {
    const userId = req.id;
    const trainingId = req.params.trainingId;

    const existingUser = await user.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const training = existingUser.training.id(trainingId);

    if (!training) {
      return res.status(404).json({ message: "Training not found" });
    }

    const index = existingUser.training.indexOf(training);
    existingUser.training.splice(index, 1);
    await existingUser.save();

    res.status(200).json({
      message: "Training deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};
