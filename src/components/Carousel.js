import React from 'react';
import Picture from './Picture';

class Carousel extends React.Component {

    _time = 3000;
    _timeoutId = null;

    constructor (props) {
        super(props);

        this.state = this._getState(props);
        this._next = this._next.bind(this);
    }

    static propTypes = {
        images: React.PropTypes.array.isRequired,
        autoPlay: React.PropTypes.bool.isRequired
    }

    _getState (props) {
        const {images, autoPlay} = props;
        const index = 0;
        const count = images.length;

        return {
            images,
            count,
            index,
            autoPlay
        };
    }

    _cueNext () {
        window.clearTimeout(this._timeoutId);
        this._timeoutId = window.setTimeout(
            this._next,
            this._time
        );
    }

    _next () {
        let index = this.state.index + 1;
        if (index === this.state.count) {
            index = 0;
        }
        this.setState({
            index
        });
    }

    componentWillReceiveProps (props) {
        this.setState(this._getState(props));
    }

    render () {
        const {images, index} = this.state;

        return (
            <section className="Carousel">
                <ul className="Carousel-list">
                    {images.map((image, i) => {
                        const {key, src, caption} = image;
                        const state = i === index ? 'is-active' : '';
                        return (
                            <li key={key}
                                className={`Carousel-item ${state}`}>
                                <Picture src={src} alt={caption} />
                            </li>
                        );
                    })}
                </ul>
            </section>
        );
    }

    triggerAutoPlay () {
        const {autoPlay} = this.state;

        if (autoPlay) {
            this._cueNext();
        }
    }

    componentDidUpdate (prevProps, prevState) {
        this.triggerAutoPlay();
    }

    componentDidMount () {
        this.triggerAutoPlay();
    }

    componentWillUnmount () {
        window.clearTimeout(this._timeoutId);
    }
}

export {Carousel as default};
