import axios from '@configs/api/axios';
import { AxiosAPI } from '@configs/api/type';

export const GET_INFO_USER = '/app/user';

export const getUser: AxiosAPI<any> = async () =>
    await axios.get(GET_INFO_USER);
