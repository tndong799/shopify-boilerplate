import { Link } from 'react-router-dom';
import { EAppRouter } from './type';
export const NavMenu = () => {
    return (
        <ui-nav-menu>
            <Link to={EAppRouter.root} rel="home">
                Home
            </Link>
            <Link to={EAppRouter.pricing}>Pricing</Link>
            <Link to={EAppRouter.account}>Account</Link>
        </ui-nav-menu>
    );
};
