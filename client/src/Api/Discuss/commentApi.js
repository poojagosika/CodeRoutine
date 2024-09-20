import axiosInstance from "../axiosConfig";

export const addCommentToTopic = async (id, data) => {
  return await axiosInstance.post(`/api/discuss/topics/${id}/comments`, data);
};

export const addLikeOrRemoveLikeComment = async (id) => {
  return await axiosInstance.put(`/api/discuss/comments/${id}/like`);
};

export const editComment = async (id, data) => {
  return await axiosInstance.put(`/api/discuss/comments/${id}/edit`, data);
};

export const deleteComment = async (topicId, commentId) => {
  return await axiosInstance.delete(
    `/api/discuss/comments/${topicId}/${commentId}/delete`
  );
};
