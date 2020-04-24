import axios, { AxiosRequestConfig } from 'axios';
import StorageService from './StorageService';

class ApiService {

  private basePath : string | undefined;
  private api: any;

  // TODO: handle authentications
  // TODO: add logout
  // TODO: push user to login on 401 error
  
  constructor () {
    console.log(process.env.REACT_APP_BASE_PATH)
    this.basePath = process.env.REACT_APP_BASE_PATH + '/rest';
    this.api = axios.create({
      baseURL: process.env.REACT_APP_BASE_PATH,
    });
  }

  private async apiCall (url: string, method = 'GET', data?: any) {
    const headers : any = {};
  
    const token = StorageService.getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
    // @ts-ignore
    const res = await axios({
      method,
      url: this.basePath + url,
      data,
      headers,
    });
  
    return res.data;
  }

  async singUp (body: any) {
    const result = await this.apiCall(`/auth/signup`, 'POST', body);
    return result.data;
  }
  async login (body: any) {
    const result = await this.apiCall(`/auth/login`, 'POST', body);
    return result.data;
  }
  async getShortLink (long_link: string) {
    const result = await this.apiCall(`/links/shorten`, 'POST', {long_link});
    return result.data;
  }

  async getLinkStats (filters: any) {
    const result = await this.apiCall(`/link_stats`, 'POST', {filters});
    return result.data;
  }
  async getSingleLinkStats (id: number, filters: any) {
    const result = await this.apiCall(`/link_stats/${id}`, 'POST', {filters});
    return result.data;
  }
}

export default new ApiService();

