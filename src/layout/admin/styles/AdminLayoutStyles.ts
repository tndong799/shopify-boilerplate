import styled from 'styled-components';

export const LayoutStyled = styled.div.attrs({
    className: 'admin-layout',
})`
    display: flex;
    height: 100vh;
    width: 100%;
    position: relative;
`;

export const SidebarStyled = styled.div.attrs({
    className: 'admin-layout-sidebar',
})`
    /* position: absolute; */
    /* left: 0; */
    /* top: 0; */
    flex-shrink: 0;
    height: 100%;
    overflow: hidden;
    /* width: 180px; */
`;

export const LogoStyled = styled.div`
    display: flex;
    align-items: center;

    img {
        max-width: 100%;
        height: auto;
        vertical-align: middle;
        margin-right: 1rem;
    }
`;

export const LogoWrapperStyled = styled.div`
    padding: 0.5rem 1rem;
    a {
        text-decoration: none;
    }
`;

export const MainStyled = styled.div.attrs({
    className: 'admin-layout-main',
})`
    flex: 1;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    padding: 0.5rem;
`;
