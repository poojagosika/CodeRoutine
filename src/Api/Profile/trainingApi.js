import axiosInstance from "../axiosConfig";

export const addTraining = async (data) => {
  return await axiosInstance.post("/api/users/profile/addTraining", data);
};

export const updateTraining = async (trainingId, data) => {
  return await axiosInstance.put(
    `/api/users/profile/updateTraining/${trainingId}`,
    data
  );
};

export const deleteTraining = async (trainingId) => {
  return await axiosInstance.delete(
    `/api/users/profile/deleteTraining/${trainingId}`
  );
};
