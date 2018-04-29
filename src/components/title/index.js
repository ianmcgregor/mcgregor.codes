import React from 'react';
import styled from 'styled-components';
import Label from '../label';
import {linkCss, marginFixed} from '../../styles';

const Header = styled.div`
    margin: ${marginFixed}px 0 ${marginFixed * 2}px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
`;

const ExternalLink = styled.a`
    ${linkCss}
`;

export default ({
    title,
    link,
    el = 'h2'
}) => (
    <Header>
        <Label text={title} el={el}/>
        {link && (
            <ExternalLink
                href={link}
                target="_blank"
                rel="nofollow">
                <Label
                    arrow="right"
                    text=""
                    el="div"
                />
            </ExternalLink>
        )}
    </Header>
);
