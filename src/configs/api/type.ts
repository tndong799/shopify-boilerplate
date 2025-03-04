import { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface AxiosAPI<T, A = null, O = AxiosRequestConfig> {
    (arg?: A, options?: O): Promise<T>;
}

export interface AxiosRestfulAPI<R, I, T, O = AxiosRequestConfig> {
    (arg?: R, id?: I, options?: O): Promise<AxiosResponse<T>>;
}
