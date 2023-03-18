import axios, { AxiosStatic } from 'axios';

export class HttpService {
  public baseUrl: string;

  public fetchingService: AxiosStatic;

  public apiVersion: string;

  constructor(
    baseUrl = 'http://localhost:4200/',
    fetchingService: AxiosStatic = axios,
    apiVersion = 'api'
  ) {
    this.baseUrl = baseUrl!;
    this.fetchingService = fetchingService;
    this.apiVersion = apiVersion;
  }

  private getFullApiUrl(url: string) {
    return `${this.baseUrl}${this.apiVersion}/${url}`;
  }

  async get(route: string) {
    const response = await this.fetchingService.get(this.getFullApiUrl(route));
    return response.data;
  }

  async post<T>(route: string, body: T) {
    const response = await this.fetchingService.post(this.getFullApiUrl(route), body);
    return response.data;
  }

  async put<T>(route: string, body: T) {
    const response = await this.fetchingService.put(this.getFullApiUrl(route), body);
    return response.data;
  }

  async delete(route: string) {
    const response = await this.fetchingService.delete(this.getFullApiUrl(route));
    return response.data;
  }
}
