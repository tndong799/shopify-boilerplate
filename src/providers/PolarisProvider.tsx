import '@shopify/polaris/build/esm/styles.css';
import { AppProvider as PolarisAppProvider } from '@shopify/polaris';
import enPolarisTranslations from '@shopify/polaris/locales/en.json';

const PolarisProvider: React.FC<{ children: React.ReactElement }> = ({
    children,
}) => {
    return (
        <PolarisAppProvider i18n={enPolarisTranslations}>
            {children}
        </PolarisAppProvider>
    );
};

export default PolarisProvider;
