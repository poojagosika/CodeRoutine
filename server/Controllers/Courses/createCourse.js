import Course from "../../Model/CoursesModel.js";

// Create a new course
export const createCourse = async (req, res) => {
  try {
    const newCourse = new Course({ ...req.body, createdBy: req.id });
    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
