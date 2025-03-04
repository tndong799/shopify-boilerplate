/* eslint-disable @typescript-eslint/no-explicit-any */
import { createUrlWithQueryString } from '@utils/url';
import { NavigateOptions, useNavigate } from 'react-router-dom';

export const useAppNavigate = () => {
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(window.location.search);

    const appNavigate = (path: string, options?: NavigateOptions) => {
        const host = searchParams.get('host');
        const shop = searchParams.get('shop');
        const cs_session_token = searchParams.get('cs_session_token');
        const token = searchParams.get('token');
        const shop_id = searchParams.get('shop_id');
        const state = {
            ...options?.state,
            ...(host && { host }),
            ...(shop && { shop }),
            ...(cs_session_token && { cs_session_token }),
        };

        if (!path) {
            return navigate(-1);
        } else {
            return navigate(
                createUrlWithQueryString(path, {
                    token: token,
                    shop_id: shop_id,
                }),
                { state }
            );
        }
    };

    return appNavigate;
};
