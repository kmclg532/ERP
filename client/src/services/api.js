import axios from "axios";

const normalizeApiBaseUrl = (rawUrl) => {
  const trimmed = (rawUrl || "http://localhost:5000").trim().replace(/\/+$/, "");

  if (/\/api\/v1$/i.test(trimmed)) {
    return trimmed;
  }

  if (/\/api$/i.test(trimmed)) {
    return `${trimmed}/v1`;
  }

  return `${trimmed}/api/v1`;
};

const API_BASE_URL = normalizeApiBaseUrl(import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const setAccessToken = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    return;
  }

  localStorage.removeItem("accessToken");
  delete api.defaults.headers.common.Authorization;
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const requestUrl = originalRequest?.url || "";
    const isRefreshRequest = requestUrl.includes("/auth/refresh");
    const isLoginRequest = requestUrl.includes("/auth/login");

    // Handle 401 Unauthorized
    if (
      error.response?.status === 401 &&
      !originalRequest?._retry &&
      !isRefreshRequest &&
      !isLoginRequest
    ) {
      originalRequest._retry = true;

      try {
        const response = await api.post("/auth/refresh");
        const { accessToken } = response.data.data;
        setAccessToken(accessToken);

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, redirect to login
        setAccessToken(null);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
