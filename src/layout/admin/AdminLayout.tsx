import { DEV_MODE } from '@configs/env';
import Sidebar from '@layout/admin/Sidebar';
import {
    LayoutStyled,
    MainStyled,
} from '@layout/admin/styles/AdminLayoutStyles';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <LayoutStyled>
            {DEV_MODE == 1 && <Sidebar />}
            <MainStyled>{children}</MainStyled>
        </LayoutStyled>
    );
};

export default AdminLayout;
