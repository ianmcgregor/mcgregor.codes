import React from 'react';
import Link from 'gatsby-link';
import {withRouter} from 'react-router';
import styled from 'styled-components';
import {media, linkCss, marginFixed} from '../../styles';
import pagePathname from '../../utils/page-pathname';
import Label from '../label';

const Container = styled.div`
    display: flex;

    ${media.desktop`
        flex-grow: 1;
    `}
`;

const Menu = styled.nav`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Links = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LinkItem = styled.li`
    margin: 0 ${marginFixed}px;
`;

const MenuLink = styled(Link)`
    ${linkCss}
`;

export default withRouter(({
    links,
    LinkComponent = MenuLink
}) => (
    <Container>
        <Menu>
            <Links>
                {links.map(({label, url}) => (
                    <LinkItem key={label}>
                        <LinkComponent
                            exact={!(url.replace(/\//g, ''))}
                            to={pagePathname(url)}
                            activeClassName="active">
                            <Label
                                text={label}
                                el="span"
                            />
                        </LinkComponent>
                    </LinkItem>
                ))}
            </Links>
        </Menu>
    </Container>
));
