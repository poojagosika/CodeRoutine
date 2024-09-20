import axiosInstance from "./axiosConfig";

export const addProblem = async (data) => {
  return await axiosInstance.post("/api/problem", data);
};

export const getAllQuestionsData = async () => {
  return await axiosInstance.get("/api/problem");
};

export const getProblemById = async (id) => {
  return await axiosInstance.get(`/api/problem/${id}`);
};
