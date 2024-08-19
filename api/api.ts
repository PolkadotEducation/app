import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";

export class Api {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = Cookies.get("token");
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  public async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    "use server";
    try {
      const response = await this.axiosInstance.get<T>(url, config);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    "use server";
    try {
      const response = await this.axiosInstance.post<T>(url, data, config);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    "use server";
    try {
      const response = await this.axiosInstance.put<T>(url, data, config);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    "use server";
    try {
      const response = await this.axiosInstance.delete<T>(url, config);
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: unknown): string {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.error || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return String(error);
    }
  }
}

const api = new Api(
  process.env.NEXT_PUBLIC_API_DOMAIN || "http://127.0.0.1:4000",
);
export default api;
