import React from 'react';
import styled from 'styled-components';
import Menu from '../menu';
import {
    media,
    marginMobile,
    marginTablet,
    marginDesktop,
    menuHeight
} from '../../styles';

const Header = styled.header`
    width: 100%;
    height: calc(${marginMobile * 4}vw + ${menuHeight}px);

    ${media.tablet`
        height: calc(${marginTablet * 2}vw + ${menuHeight}px);
    `}

    ${media.desktop`
        height: calc(${marginDesktop * 2}vw + ${menuHeight}px);
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
