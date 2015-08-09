import React from 'react';

class Overlay extends React.Component {

    static propTypes = {
        link: React.PropTypes.string.isRequired
    }

    render () {
        const {link, onClose} = this.props;

        return (
            <div className="Overlay">
                <nav className="Overlay-nav">
                    <a className="Overlay-link" href={link} target="_blank">
                        <span className="Icon Icon--link"></span>
                    </a>
                    <button className="Overlay-close" onClick={onClose}>
                        <span className="Icon Icon--close"></span>
                    </button>
                </nav>
            </div>
        );
    }
}

export {Overlay as default};
