import i18n from '@locales/index';
import MiddlewareProvider from '@providers/MiddlewareProvider';
import PolarisProvider from '@providers/PolarisProvider';
import { Box, Frame } from '@shopify/polaris';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import AppBridgeProvider from './AppBridgeProvider';
import { Fragment, useEffect } from 'react';
import { NavMenu } from '@routes/NavMenu';
import { publicRoutes } from '@routes/index';

const AppProvider: React.FC = () => {
    useEffect(() => {
        console.log('AppProvider');
    }, []);
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <PolarisProvider>
                            <AppBridgeProvider>
                                <MiddlewareProvider>
                                    <I18nextProvider i18n={i18n}>
                                        <NavMenu />
                                        <Frame>
                                            <Box paddingBlockEnd={'800'}>
                                                <Outlet />
                                            </Box>
                                        </Frame>
                                    </I18nextProvider>
                                </MiddlewareProvider>
                            </AppBridgeProvider>
                        </PolarisProvider>
                    }
                >
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout: React.FC<{
                            children: React.ReactNode;
                        }> = Fragment;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppProvider;
