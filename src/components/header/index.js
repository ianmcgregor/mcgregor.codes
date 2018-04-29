import React from 'react';
import styled from 'styled-components';
import Menu from '../menu';
import {
    media,
    marginMobile,
    marginTablet,
    marginDesktop
} from '../../styles';

const Header = styled.header`
    width: 100%;
    padding: calc(${marginMobile * 2}% + 10px) 0;

    ${media.tablet`
        padding: calc(${marginTablet}% + 10px) 0;
    `}

    ${media.desktop`
        padding: calc(${marginDesktop}% + 10px) 0;
    `}
`;

const Inner = styled.div`
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
    width: 100%;
    margin: ${marginMobile * 2}% 0;

    ${media.tablet`
        margin: ${marginTablet}% 0;
    `}

    ${media.desktop`
        margin: ${marginDesktop}% 0;
    `}
`;

export default ({
    links,
    buttons,
    socials
}) => (
    <Header>
        <Inner>
            <Menu
                links={links}
                buttons={buttons}
                socials={socials}
            />
        </Inner>
    </Header>
);
