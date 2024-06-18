import axios from "axios";

const API = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;
const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
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

export const getProblemById = async (id) => {
  return await axios.get(`${API}/api/problem/${id}`);
};