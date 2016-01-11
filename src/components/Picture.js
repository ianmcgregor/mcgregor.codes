import React from 'react';

function getUrl (base, src, ext) {
    return `${base}_${src.width}x${src.height}.${ext}`;
}

function getSrcSet (arr, base, ext) {
    return arr.map((src) => (
        `${getUrl(base, src, ext)} ${src.vw}w`
    )).join(',\n');
}

function getDefault (arr, base, ext) {
    const src = arr[arr.length - 1];
    return getUrl(base, src, ext);
}

export default function Picture(props) {
    const {src, alt, srcSet} = props;

    const srcSetJpg = getSrcSet(srcSet, src, 'jpg');
    const srcSetWebp = getSrcSet(srcSet, src, 'webp');
    const srcDefault = getDefault(srcSet, src, 'jpg');

    return (
        <picture>
            <source type="image/webp"
                srcSet={srcSetWebp}/>
            <img src={srcDefault}
                srcSet={srcSetJpg}
                alt={alt}/>
        </picture>
    );
}
