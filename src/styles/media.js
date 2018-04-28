import {css} from 'styled-components';

export const sizes = {
    mobile: [320, 'max'],
    tablet: [480],
    desktop: [960]
};

export const media = Object.keys(sizes).reduce((ob, key) => {
    const [size, bound = 'min'] = sizes[key];
    const em = size / 16;
    ob[key] = (...args) => css`
        @media (${bound}-width: ${em}em) {
            ${css(...args)}
        }
    `;
    return ob;
}, {});
