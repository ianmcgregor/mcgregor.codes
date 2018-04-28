import './fonts/index.css';
import {css} from 'styled-components';

// const fontNameTitle = '"Press Start 2P"';
const fontNameTitle = '"IBM Plex Mono"';
const fontNameText = '"Open Sans"';

export const fontTitle = css`
    font-family: ${fontNameTitle}, sans-serif;
    font-weight: 400;
`;

export const fontText = css`
    font-family: ${fontNameText}, sans-serif;
    font-weight: 200;
`;
