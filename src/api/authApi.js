import axios from "axios";

const API_URL = "https://aiexpense-tracker-b.onrender.com";

export const signupApi = (data) => {
  return axios.post(`${API_URL}/auth/signup`, data);
};

export const loginApi = (data) => {
  return axios.post(`${API_URL}/auth/login`, data);
};
