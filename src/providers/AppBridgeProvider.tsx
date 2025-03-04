/* eslint-disable @typescript-eslint/no-explicit-any */
import { SHOPIFY_API_KEY } from '@configs/env';
import { isShopifyEmbedded } from '@shopify/app-bridge-utils';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
const AppBridgeProvider: React.FC<{ children: React.ReactElement }> = ({
    children,
}) => {
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        if (isShopifyEmbedded()) {
            setLoading(false);
        } else {
            const shop =
                window.__SHOP__ ??
                new URLSearchParams(location.search).get('shop') ??
                '';
            const url = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=read_products,write_orders&redirect_uri=http://localhost:3100/auth/callback`;
            window.location.assign(url);
        }
    }, []);

    return <>{loading ? 'loading...' : children}</>;
};

export default AppBridgeProvider;
