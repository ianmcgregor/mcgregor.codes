import React from 'react';

class Picture extends React.Component {

    static propTypes = {
        src: React.PropTypes.string.isRequired,
        alt: React.PropTypes.string.isRequired
    }

    shouldComponentUpdate () {
        return false;
    }

    render () {
        const {src, alt} = this.props;

        return (
            <picture>
                <source srcSet={src + '.webp'} type="image/webp"/>
                <img src={src + '.jpg'} alt={alt}/>
            </picture>
        );
    }
}

export {Picture as default};
