import axiosInstance from "../axiosConfig";

export const createDiscuss = async (data) => {
  return await axiosInstance.post("/api/discuss", data);
};

export const getDiscuss = async () => {
  return await axiosInstance.get("/api/discuss");
};

export const getDiscussById = async (id) => {
  return await axiosInstance.get(`/api/discuss/${id}`);
};

export const updateDiscussById = async (id, data) => {
  return await axiosInstance.put(`/api/discuss/${id}`, data);
};

export const deleteDiscussById = async (id) => {
  return await axiosInstance.delete(`/api/discuss/${id}`);
};

export const addLikeOrRemoveLike = async (id) => {
  return await axiosInstance.put(`/api/discuss/topics/${id}/like`);
};
