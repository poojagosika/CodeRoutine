import axiosInstance from "./axiosConfig";

export const registerUser = async (data) => {
  return await axiosInstance.post("/api/users/register", data);
};

export const loginUser = async (data) => {
  return await axiosInstance.post("/api/users/login", data);
};

export const googleLogin = async (data) => {
  return await axiosInstance.post("/api/users/googleLogin", data);
};

export const getUserByUserName = async (userName) => {
  return await axiosInstance.get(`/api/users/${userName}`);
};

export const updateUserProfile = async (data) => {
  return await axiosInstance.put("/api/users/updateProfile", data);
};
