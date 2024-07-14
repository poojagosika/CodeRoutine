import user from "../../Model/userModel.js"; // Adjust the import path based on your project structure

// Add a new project
export const addProject = async (req, res) => {
  try {
    const userId = req.id;
    const newProject = req.body;

    const userData = await user.findById(userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    userData.project.push(newProject);
    await userData.save();

    res.status(201).json({
      message: "Project added successfully",
      project: userData.project,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// Update an existing project
export const updateProject = async (req, res) => {
  try {
    const userId = req.id;
    const projectId = req.params.projectId;
    const updatedData = req.body;

    const userData = await user.findById(userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const project = userData.project.id(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    Object.assign(project, updatedData);
    await userData.save();

    res.status(200).json({
      message: "Project updated successfully",
      project: userData.project,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// Delete a project
export const deleteProject = async (req, res) => {
  try {
    const userId = req.id;
    const projectId = req.params.projectId;

    const userData = await user.findById(userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const project = userData.project.id(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const index = userData.project.indexOf(project);
    userData.project.splice(index, 1);
    await userData.save();

    res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};
