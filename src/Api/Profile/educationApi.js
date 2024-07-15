import axiosInstance from "../axiosConfig";

export const addEducation = async (data) => {
  return await axiosInstance.post("/api/users/profile/addEducation", data);
};

export const updateEducation = async (educationId, data) => {
  return await axiosInstance.put(
    `/api/users/profile/updateEducation/${educationId}`,
    data
  );
};

export const deleteEducation = async (educationId) => {
  return await axiosInstance.delete(
    `/api/users/profile/deleteEducation/${educationId}`
  );
};
