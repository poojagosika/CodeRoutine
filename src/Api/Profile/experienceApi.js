import axiosInstance from "../axiosConfig";

export const addExperience = async (data) => {
  return await axiosInstance.post(
    "/api/users/profile/profile/addExperience",
    data
  );
};

export const updateExperience = async (experienceId, data) => {
  return await axiosInstance.put(
    `/api/users/profile/updateExperience/${experienceId}`,
    data
  );
};

export const deleteExperience = async (experienceId, data) => {
  return await axiosInstance.delete(
    `/api/users/profile/deleteExperience/${experienceId}`,
    data
  );
};
