import { INDEX_ROUTE } from '@routes/index';
import { Link } from 'react-router-dom';
import { LogoStyled, LogoWrapperStyled } from './styles/AdminLayoutStyles';
import { Text } from '@shopify/polaris';

const Logo: React.FC = () => {
    return (
        <LogoWrapperStyled>
            <Link to={INDEX_ROUTE}>
                <LogoStyled>
                    <img
                        alt="Logo"
                        src="https://polaris.shopify.com/images/shopify-logo.svg"
                    />
                    <Text as="span">Socialwidget</Text>
                </LogoStyled>
            </Link>
        </LogoWrapperStyled>
    );
};

export default Logo;
