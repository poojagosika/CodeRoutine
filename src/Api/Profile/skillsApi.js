import axiosInstance from "../axiosConfig";

export const addSkill = async (data) => {
  return await axiosInstance.post("/api/users/profile/profile/addSkill", data);
};

export const updateSkill = async (skillId, data) => {
  return await axiosInstance.put(
    `/api/users/profile/updateSkill/${skillId}`,
    data
  );
};

export const deleteSkill = async (skillId, data) => {
  return await axiosInstance.delete(
    `/api/users/profile/deleteSkill/${skillId}`,
    data
  );
};
