// src/utils/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  timeout: 10000, // 요청 타임아웃 설정 (ms)
  headers: {
    "Content-Type": "application/json",
  },
});
// // 요청 인터셉터 (옵션)
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // 필요 시 토큰 등 인증 헤더 추가
//     const token = ""; // 서버 사이드에서 필요한 경우 토큰을 추가
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error),
// );
//
// // 응답 인터셉터 (옵션)
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => Promise.reject(error),
// );

export default axiosInstance;
