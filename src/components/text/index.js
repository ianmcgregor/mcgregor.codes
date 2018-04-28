import React from 'react';
import styled from 'styled-components';
import {
    boxCss,
    color,
    fontText,
    media,
    marginFixed
} from '../../styles';

const TextHolder = styled.div`
    color: ${color.black};
    ${fontText};
    font-size: 16px;
    line-height: 22px;
    margin: 0 5px ${marginFixed}px;

    p {
        ${boxCss}
    }

    a {
        color: ${color.black};
        text-decoration: underline;

        ${media.desktop`
            transition: opacity 0.2s;
            &:hover {
                opacity: 0.6;
            }
        `}
    }
`;

const getText = text => {
    return typeof text === 'string' ? `<p>${text}</p>` : text.childMarkdownRemark.html;
};

const getParas = text => getText(text).split('</p>').slice(0, -1).map(p => `${p}</p>`);

const addTarget = html => html.split(' href="http').join(' target="_blank" href="http');

export default ({
    text
}) => (
    <div>
        {getParas(text).map((para, i) => (
            <TextHolder key={i} dangerouslySetInnerHTML={{
                __html: addTarget(`${para}</p>`)
            }}/>
        ))}
    </div>
);
