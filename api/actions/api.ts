"use server";

import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

export type ServerAxiosError = {
  error: { message: string };
};

const baseURL = process.env.NEXT_PUBLIC_API_DOMAIN || "http://127.0.0.1:4000";
const AUTH_CODE = process.env.NEXT_PUBLIC_AUTH_TOKEN || "localAuthCode";

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.code = AUTH_CODE;
    }
    config.headers.origin = process.env.NEXT_PUBLIC_BASE_URL;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export async function serverGet<T>(url: string, config?: AxiosRequestConfig): Promise<T | ServerAxiosError> {
  try {
    const response = await axiosInstance.get<T>(url, config);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
}

export async function serverPost<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T | ServerAxiosError> {
  try {
    const response = await axiosInstance.post<T>(url, data, config);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
}

export async function serverPut<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T | ServerAxiosError> {
  try {
    const response = await axiosInstance.put<T>(url, data, config);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
}

export async function serverDelete<T>(url: string, config?: AxiosRequestConfig): Promise<T | ServerAxiosError> {
  try {
    const response = await axiosInstance.delete<T>(url, config);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
}

// We can not throw exception to upstream, as this runs on server side.
function handleError(error: unknown): ServerAxiosError {
  if (axios.isAxiosError(error)) {
    return { error: { message: error.response?.data?.error?.message || error.message } };
  } else if (error instanceof Error) {
    return { error: { message: error.message } };
  } else {
    return { error: { message: String(error) } };
  }
}
