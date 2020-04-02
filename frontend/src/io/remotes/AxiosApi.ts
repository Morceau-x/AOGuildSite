import { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

export default class AxiosApi {
    network: AxiosInstance;
    csrfInterceptors: (number | undefined)[] = [undefined, undefined];

    constructor() {}

    withCsrf = (config: AxiosRequestConfig) => {
        return axios.create({
            withCredentials: true,
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'X-CSRFTOKEN',
            ...config,
        });
    };

    basicGetData = async (axiosInstance: AxiosInstance, url: string): Promise<any> => {
        try {
            const { data } = await axiosInstance.get(url);
            return data;
        } catch (e) {
            throw e;
        }
    };

    basicPostData = async (axiosInstance: AxiosInstance, url: string, postData: any): Promise<any> => {
        try {
            const { data } = await axiosInstance.post(url, postData);
            return data;
        } catch (e) {
            throw e;
        }
    };
}
