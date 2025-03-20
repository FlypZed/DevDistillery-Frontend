import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import ResponseResultDTO from "../models/ResponseResultDTO";
export interface HttpClientConfig {
    axiosConfiguration?: AxiosRequestConfig;
}

export class HttpClient {
    private client: AxiosInstance;

    constructor(baseURL: string, timeout?: number) {
        this.client = axios.create({
            baseURL: baseURL,
            timeout: timeout || 10000,
        })
    }

    private handleAxiosRequestError<T>(error: {
    response: AxiosResponse<ResponseResultDTO<T>> | undefined;
    request: XMLHttpRequest | undefined;
  }): ResponseResultDTO<T> {
    if (error.response) {
      return ResponseResultDTO.fromAxiosResponse(error.response);
    }

    if (error.request) {
      return ResponseResultDTO.noResponseError();
    }

    return ResponseResultDTO.requestError();
  }

  private addBaseConfig(config: AxiosRequestConfig, token: any) {
    if (!config.headers) {
      config.headers = {};
    }
    if (token && token !== undefined) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }

  private async generateConfig(extraConfig?: AxiosRequestConfig): Promise<AxiosRequestConfig> {
    var config: AxiosRequestConfig = extraConfig || {};
    // TODO: Logica para obtener el token del Front -> Reemplazar Token por el null
    this.addBaseConfig(config, null);

    return config;
  }

    async get<T> (url: string): Promise<ResponseResultDTO<T>> {
        return this.client.get(url, await this.generateConfig())
                .then((response: AxiosResponse<ResponseResultDTO<T>>) => ResponseResultDTO.fromAxiosResponse(response))
                .catch((error) => this.handleAxiosRequestError(error));
    }

  async post<T, R>(url: string, payload: T): Promise<ResponseResultDTO<R>> {
    return this.client
      .post(url, payload, await this.generateConfig())
      .then((response: AxiosResponse<ResponseResultDTO<R>>) => ResponseResultDTO.fromAxiosResponse(response))
      .catch((error) => this.handleAxiosRequestError(error));
  }

  async put<T, R>(url: string, payload: T): Promise<ResponseResultDTO<R>> {
    return this.client
      .put(url, payload, await this.generateConfig())
      .then((response: AxiosResponse<ResponseResultDTO<R>>) => ResponseResultDTO.fromAxiosResponse(response))
      .catch((error) => this.handleAxiosRequestError(error));
  }
}

const HttpClientInstance = new HttpClient(`http://localhost:8080`, 10000);

export default HttpClientInstance;