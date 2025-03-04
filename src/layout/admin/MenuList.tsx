import { useAppNavigate } from '@hooks/useAppNavigate';
import { INDEX_ROUTE } from '@routes/index';
import { Navigation } from '@shopify/polaris';
import { HomeFilledIcon } from '@shopify/polaris-icons';
import { useLocation } from 'react-router-dom';

const MenuList: React.FC = () => {
    const navigate = useAppNavigate();
    const location = useLocation();
    const currentPath: unknown = location.pathname ?? '';
    console.log('currentPath ', currentPath);

    const onRedirect = (link: string) => {
        navigate(link);
    };

    return (
        <Navigation location="/">
            <Navigation.Section
                items={[
                    {
                        // url: INDEX_ROUTE,
                        excludePaths: ['#'],
                        label: 'Dashboard',
                        icon: HomeFilledIcon,
                        selected: currentPath === INDEX_ROUTE,
                        onClick: () => onRedirect(INDEX_ROUTE),
                    },
                    {
                        //url: '/order',
                        label: 'Media Source',
                        icon: HomeFilledIcon,
                        selected: currentPath === '/media-source',
                        onClick: () => onRedirect('/media-source'),
                    },
                    {
                        //url: '/order',
                        label: 'Gallery',
                        icon: HomeFilledIcon,
                        selected: currentPath === '/gallery',
                        onClick: () => onRedirect('/gallery'),
                    },
                    {
                        //url: '/order',
                        label: 'Widget',
                        icon: HomeFilledIcon,
                        selected: currentPath === '/widget',
                        onClick: () => onRedirect('/media-source'),
                    },
                    {
                        //url: '/order',
                        label: 'Accounts',
                        icon: HomeFilledIcon,
                        selected: currentPath === '/accounts',
                        onClick: () => onRedirect('/accounts'),
                    },
                    {
                        //url: '/order',
                        label: 'Report',
                        icon: HomeFilledIcon,
                        selected: currentPath === '/report',
                        onClick: () => onRedirect('/report'),
                    },
                    {
                        //url: '/order',
                        label: 'Pricing',
                        icon: HomeFilledIcon,
                        selected: currentPath === '/pricing',
                        onClick: () => onRedirect('/pricing'),
                    },
                ]}
            />
        </Navigation>
    );
};

export default MenuList;
