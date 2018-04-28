import {css} from 'styled-components';
import {media} from './media';
import {color} from './color';

export const boxCss = css`
    display: inline;
    background-color: ${color.white};
    box-shadow: 5px 0 0 ${color.white}, -5px 0 0 ${color.white};
`;

export const linkCss = css`
    display: block;
    opacity: 0.4;
    transition: opacity 0.4s ease;

    &.active {
        opacity: 1;
    }

    &:hover {
        ${media.tablet`
            opacity: 1;
        `}
    }
`;
