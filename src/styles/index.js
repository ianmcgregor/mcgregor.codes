import 'normalize.css';
import {injectGlobal} from 'styled-components';
import {color} from './color';
import {fontText} from './font';

export * from './color';
export * from './css';
export * from './font';
export * from './media';
export * from './dimensions';
export * from './easings';

injectGlobal`
    html {
        box-sizing: border-box;
        font-family: sans-serif;
        height: 100%;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        ${'' /* text-rendering: optimizeLegibility !important; */}
        ${'' /* text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004); */}
    }

    *,
    *::before,
    *::after {
        box-sizing: inherit;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    body,
    blockquote,
    dl,
    dd,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    figure,
    p,
    pre {
        margin: 0;
    }

    button {
        background: transparent;
        border: 0;
        padding: 0;
    }

    button:focus {
        outline: none;
    }

    address,
    cite {
        font-style: normal;
    }

    fieldset {
        border: 0;
        margin: 0;
        padding: 0;
    }

    iframe {
        border: 0;
    }

    ol,
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    [tabindex="-1"]:focus {
        outline: none !important;
    }

    a {
        text-decoration: none;
    }

    a:active,
    a:hover {
        outline-width: 0;
    }

    button,
    input,
    optgroup,
    select,
    textarea {
        font-family: inherit;
        font-size: 100%;
        line-height: 1.15;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-weight: normal;
    }

    body {
        background-color: ${color.black};
        ${fontText};
        height: 100%;
        line-height: 1.38;
        margin: 0;
        overflow-y: scroll;
        padding: 0;
        text-size-adjust: none;
        -webkit-touch-callout: none;

        > div {
            overflow-x: hidden;
            width: 100%;
        }
    }
`;
