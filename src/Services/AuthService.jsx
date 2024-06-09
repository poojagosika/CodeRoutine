import axios from "axios";

const API = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;
// axios.defaults.headers.common['Authorization'] = `Bearer${localStorage.getItem('token')}`;

export const RegisterUser = async (data) => {
  return await axios.post(`${API}/api/users/register`, data);
};

export const LoginUser = async (data) => {
  return await axios.post(`${API}/api/users/login`, data);
};
