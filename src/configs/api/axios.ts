import { API_BASE_URL } from '@configs/env';
import {
    AxiosError,
    AxiosRequestConfig,
    AxiosResponse,
    default as instance,
} from 'axios';

const axiosConfig: AxiosRequestConfig = {
    baseURL: API_BASE_URL + '/api' || '',
    timeout: 60 * 1000,
};

const axiosService = instance.create(axiosConfig);

axiosService.interceptors.request.use(async function (config) {
    // Do something before request is sent
    config.headers.Authorization = `Bearer ${await shopify.idToken()}`;
    config.headers['Content-Type'] = 'application/json';
    return config;
});

const onResponse = (response: AxiosResponse) => {
    const { data } = response;

    const contentType = response.headers['content-type'];
    if (contentType === 'application/json') {
        return data;
    }

    return response;
};

const onResponseError = (error: AxiosError) => {
    console.error('Axios error:', error);
    return Promise.reject(error);
};

axiosService.interceptors.response.use(onResponse, onResponseError);

export default axiosService;
