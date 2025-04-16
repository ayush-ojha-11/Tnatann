import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "https://tnatann-backend.onrender.com/api",
  withCredentials: true,
});
