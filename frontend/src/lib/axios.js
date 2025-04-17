import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "/api/api",
  withCredentials: true,
});
