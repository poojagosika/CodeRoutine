import axiosInstance from "../axiosConfig";

export const addReplyToComment = async (id, data) => {
  return await axiosInstance.post(`/api/discuss/comments/${id}/replies`, data);
};

export const addLikeOrRemoveLikeReply = async (id) => {
  return await axiosInstance.put(`/api/discuss/replies/${id}/like`);
};

export const editReply = async (id, data) => {
  return await axiosInstance.put(`/api/discuss/replies/${id}/edit`, data);
};

export const deleteReply = async (commentId, replyId) => {
  return await axiosInstance.delete(
    `/api/discuss/replies/${commentId}/${replyId}/delete`
  );
};
