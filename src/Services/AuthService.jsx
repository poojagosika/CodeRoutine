import axios from "axios";

const API = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;
// Axios request interceptor to add token to headers
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export const RegisterUser = async (data) => {
  return await axios.post(`${API}/api/users/register`, data);
};

export const LoginUser = async (data) => {
  return await axios.post(`${API}/api/users/login`, data);
};

export const addProblem = async (data) => {
  return await axios.post(`${API}/api/problem`, data);
};
export const getAllQuestionsData = async () => {
  return await axios.get(`${API}/api/problem`);
};
export const getProblemById = async (id) => {
  return await axios.get(`${API}/api/problem/${id}`);
};



// Discuss 

export const createDiscuss = async (data) => {
  return await axios.post(`${API}/api/discuss`, data);
};

export const getDiscuss = async () => {
  return await axios.get(`${API}/api/discuss`);
};

export const getDiscussById = async (id) => {
  return await axios.get(`${API}/api/discuss/${id}`);
};

export const updateDiscussByI = async (id, data) => {
  return await axios.put(`${API}/api/discuss/${id}`, data);
};

export const deleteDiscussById = async (id) => {
  return await axios.delete(`${API}/api/discuss/${id}`);
};

export const addLikeOrRemoveLike = async (id) => {
  return await axios.put(`${API}/api/discuss/topics/${id}/like`);
};

export const addLikeOrRemoveLikeComment = async (id) => {
  return await axios.put(`${API}/api/discuss/comments/${id}/like`);
};

export const addLikeOrRemoveLikeReply = async (id) => {
  return await axios.put(`${API}/api/discuss/replies/${id}/like`);
};

export const addCommentToTopic = async (id, data) => {
  return await axios.post(`${API}/api/discuss/topics/${id}/comments`, data);
};

export const addReplyToComment = async (id, data) => {
  return await axios.post(`${API}/api/discuss/comments/${id}/replies`, data);
};

