import { Page } from '@shopify/polaris';
import { useEffect } from 'react';

const Account: React.FC = (props) => {
    useEffect(() => {
        console.log(props);
    }, []);
    return <Page>Account</Page>;
};

export default Account;
