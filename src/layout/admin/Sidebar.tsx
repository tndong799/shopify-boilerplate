import Logo from './Logo';
import MenuList from './MenuList';
import {
    LogoStyled,
    SidebarStyled,
} from '@layout/admin/styles/AdminLayoutStyles';

const Sidebar: React.FC = () => {
    console.log('Re-render Sidebar');
    return (
        <SidebarStyled>
            <LogoStyled>
                <Logo />
            </LogoStyled>
            <MenuList />
        </SidebarStyled>
    );
};

export default Sidebar;
