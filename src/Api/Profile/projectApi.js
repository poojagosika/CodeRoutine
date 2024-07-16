import axiosInstance from "../axiosConfig";

export const addProject = async (data) => {
  return await axiosInstance.post(
    "/api/users/profile/addProject",
    data
  );
};

export const updateProject = async (projectId, data) => {
  return await axiosInstance.put(
    `/api/users/profile/updateProject/${projectId}`,
    data
  );
};

export const deleteProject = async (projectId) => {
  return await axiosInstance.delete(
    `/api/users/profile/deleteProject/${projectId}`,
  );
};
