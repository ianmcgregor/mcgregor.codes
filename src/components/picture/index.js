import React from 'react';

function getUrl (base, src, ext) {
    return `${base}_${src.width}.${ext}`;
}

function getSrcSet (arr, base, ext) {
    return arr.map(src => (
        `${getUrl(base, src, ext)} ${src.vw}w`
    )).join(',\n');
}

function getDefault (arr, base, ext) {
    const src = arr[arr.length - 1];
    return getUrl(base, src, ext);
}

export default function Picture({img, srcSet}) {

    if (!img) {
        return null;
    }

    const {src, alt} = img;
    const srcSetJpg = getSrcSet(srcSet, src, 'jpg');
    const srcSetWebp = getSrcSet(srcSet, src, 'webp');
    const srcDefault = getDefault(srcSet, src, 'jpg');

    return (
        <picture>
            <source type="image/webp"
                srcSet={srcSetWebp}/>
            <img src={srcDefault}
                srcSet={srcSetJpg}
                alt={alt} />
        </picture>
    );
}
