// src/utils/api.ts
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";
import useApiStore from "../store/useApiStore";

interface ApiOptions extends AxiosRequestConfig {
  showLoading?: boolean;
  showError?: boolean;
}

const api = async <T = unknown>(
  url: string,
  options: ApiOptions = {},
): Promise<AxiosResponse<T>> => {
  const { showLoading = true, showError = true, ...config } = options;
  const { setLoading, setError } = useApiStore.getState();
  if (showLoading) setLoading(true);
  setError(null);

  try {
    return await axiosInstance(url, config);
  } catch (error: any) {
    if (showError) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || error.message);
      } else {
        setError("알 수 없는 에러가 발생했습니다.");
      }
    }
    throw error;
  } finally {
    if (showLoading) setLoading(false);
  }
};

export default api;
