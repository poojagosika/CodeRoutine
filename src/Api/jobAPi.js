import axiosInstance from "./axiosConfig";

export const createJob = async (data) => {
  return await axiosInstance.post("/api/job", data);
};

export const getAllJobs = async () => {
  return await axiosInstance.get("/api/job");
};

export const getJobById = async (id) => {
  return await axiosInstance.get(`/api/job/${id}`);
};

export const updateJob = async (id, data) => {
  return await axiosInstance.put(`/api/job/${id}`, data);
};

export const deleteJob = async (id) => {
  return await axiosInstance.delete(`/api/job/${id}`);
};
