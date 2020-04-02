import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export function withCsrf(config: AxiosRequestConfig) {
    return axios.create({
        withCredentials: true,
        xsrfCookieName: 'csrftoken',
        xsrfHeaderName: 'X-CSRFTOKEN',
        ...config,
    });
}

export async function basicGetData(axiosInstance: AxiosInstance, url: string) {
    try {
        const { data } = await axiosInstance.get(url);
        return data;
    } catch (e) {
        throw e;
    }
}

export async function basicPostData(axiosInstance: AxiosInstance, url: string, postData: any) {
    try {
        const { data } = await axiosInstance.post(url, postData);
        return data;
    } catch (e) {
        throw e;
    }
}

export function addCsrfInterceptor(axiosInstance: AxiosInstance) {
    axiosInstance.interceptors.request.use((config) => {
        console.log(config);
        return config;
    });
}
