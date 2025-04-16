import { AxiosError } from "axios";
import { axiosInstance } from "../config/ApiClient";
import { UserData } from "../types";

export const registerUser = async (email: string) => {
  try {
    const response = await axiosInstance.post(`auth/magicLink`, { email });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    throw new Error(axiosError.response?.data?.message || "Registration failed");
  }
};

export const loginUser = async (token: string) => {
  try {
    const response = await axiosInstance.post(`auth/verify-magicLink`, { token });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    throw new Error(axiosError.response?.data?.message || "Login failed");
  }
};

export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post(`auth/logout`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    throw new Error(axiosError.response?.data?.message || "Logout failed");
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get(`auth/user`);
    return response.data as UserData;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    throw new Error(axiosError.response?.data?.message || "Error fetching user");
  }
};
