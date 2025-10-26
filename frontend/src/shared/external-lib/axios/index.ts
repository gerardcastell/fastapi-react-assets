import axios from "axios";
import type { IHttpClient } from "../../http/client.interface";

export const axiosHttpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export class HttpClient implements IHttpClient {
  async get<T>(
    url: string,
    queryParams?: Record<string, string>,
    headers?: Record<string, string>,
  ): Promise<T> {
    const response = await axiosHttpClient.get<T>(url, {
      params: queryParams,
      headers,
    });
    return response.data;
  }

  async post<T>(
    url: string,
    body: unknown,
    headers?: Record<string, string>,
  ): Promise<T> {
    const response = await axiosHttpClient.post<T>(url, body, { headers });
    return response.data;
  }

  async put<T>(
    url: string,
    body: unknown,
    headers?: Record<string, string>,
  ): Promise<T> {
    const response = await axiosHttpClient.put<T>(url, body, { headers });
    return response.data;
  }

  async delete<T>(url: string, headers?: Record<string, string>): Promise<T> {
    const response = await axiosHttpClient.delete<T>(url, { headers });
    return response.data;
  }

  async patch<T>(
    url: string,
    body: unknown,
    headers?: Record<string, string>,
  ): Promise<T> {
    const response = await axiosHttpClient.patch<T>(url, body, { headers });
    return response.data;
  }
}
