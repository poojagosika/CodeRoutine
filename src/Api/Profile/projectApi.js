import axiosInstance from "../axiosConfig";

export const addProject = async (data) => {
  return await axiosInstance.post(
    "/api/users/profile/profile/addProject",
    data
  );
};

export const updateProject = async (projectId, data) => {
  return await axiosInstance.put(
    `/api/users/profile/updateProject/${projectId}`,
    data
  );
};

export const deleteProject = async (projectId, data) => {
  return await axiosInstance.delete(
    `/api/users/profile/deleteProject/${projectId}`,
    data
  );
};
