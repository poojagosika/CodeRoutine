import axiosInstance from "./axiosConfig";

// Courses API
export const createCourse = async (data) => {
  return await axiosInstance.post("/api/courses", data);
};

export const getAllCourses = async () => {
  return await axiosInstance.get("/api/courses");
};

export const getCourseById = async (id) => {
  return await axiosInstance.get(`/api/courses/${id}`);
};

export const updateCourse = async (id, data) => {
  return await axiosInstance.put(`/api/courses/${id}`, data);
};

export const deleteCourse = async (id) => {
  return await axiosInstance.delete(`/api/courses/${id}`);
};

// Progress API
export const createOrUpdateProgress = async (data) => {
  return await axiosInstance.post("/api/courses/progress", data);
};

export const getProgressByUserAndCourse = async (userId, courseId) => {
  return await axiosInstance.get(`/api/courses/progress/${userId}/${courseId}`);
};

export const getAllProgressByUser = async (userId) => {
  return await axiosInstance.get(`/api/courses/progress/${userId}`);
};

export const deleteProgress = async (userId, courseId) => {
  return await axiosInstance.delete(
    `/api/courses/progress/${userId}/${courseId}`
  );
};
