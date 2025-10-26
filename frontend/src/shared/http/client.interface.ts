export interface IHttpClient {
  get<T>(
    url: string,
    queryParams?: Record<string, string>,
    headers?: Record<string, string>,
  ): Promise<T>;
  post<T>(
    url: string,
    body: unknown,
    headers?: Record<string, string>,
  ): Promise<T>;
  put<T>(
    url: string,
    body: unknown,
    headers?: Record<string, string>,
  ): Promise<T>;
  delete<T>(url: string, headers?: Record<string, string>): Promise<T>;
  patch<T>(
    url: string,
    body: unknown,
    headers?: Record<string, string>,
  ): Promise<T>;
}
