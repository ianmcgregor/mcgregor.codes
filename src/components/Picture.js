import React from 'react';

class Picture extends React.Component {

    static propTypes = {
        src: React.PropTypes.string.isRequired,
        alt: React.PropTypes.string.isRequired
    }

    shouldComponentUpdate () {
        return false;
    }

    _getUrl (base, src, ext) {
        return `${base}_${src.width}x${src.height}.${ext}`;
    }

    _getSrcSet (arr, base, ext) {
        return arr.map((src) => (
            `${this._getUrl(base, src, ext)} ${src.vw}w`
        )).join(',\n');
    }

    _getDefault (arr, base, ext) {
        const src = arr[arr.length - 1];
        return this._getUrl(base, src, ext);
    }

    render () {
        const {src, alt, srcSet} = this.props;

        const srcSetJpg = this._getSrcSet(srcSet, src, 'jpg');
        const srcSetWebp = this._getSrcSet(srcSet, src, 'webp');
        const srcDefault = this._getDefault(srcSet, src, 'jpg');

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
}

export {Picture as default};
