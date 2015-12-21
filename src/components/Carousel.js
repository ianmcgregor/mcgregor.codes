import React from 'react';
import ReactDOM from 'react-dom';
import Picture from './Picture';
import blockScrolling from '../utils/blockScrolling';
import constants from '../model/constants';

class Carousel extends React.Component {

    _time = 2000;
    _timeoutId = null;

    constructor (props) {
        super(props);

        this._next = this._next.bind(this);
        this._zoom = this._zoom.bind(this);
    }

    static propTypes = {
        images: React.PropTypes.array.isRequired,
        autoPlay: React.PropTypes.bool.isRequired
    }

    state = {
        autoPlay: this.props.autoPlay,
        count: this.props.images.length,
        images: this.props.images,
        index: 0,
        isZoomed: false,
        style: {}
    }

    _cancel () {
        window.clearTimeout(this._timeoutId);
    }

    _cueNext () {
        this._cancel();

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

    _zoom () {
        const isWide = window.matchMedia(constants.MQ_NARROW).matches;

        if (!isWide) {
            return;
        }

        const isZoomed = !this.state.isZoomed;
        const style = isZoomed ? this._getZoomRect() : {};
        const autoPlay = isZoomed || this.state.autoPlay;

        blockScrolling(isZoomed);

        this.setState({
            style,
            isZoomed,
            autoPlay
        });
    }

    _getZoomRect () {
        const el = ReactDOM.findDOMNode(this);
        let {left, top, width, height} = el.getBoundingClientRect();

        const viewportWidth = Math.min(window.innerWidth, document.documentElement.clientWidth);
        const viewportHeight = window.innerHeight;
        const scale = Math.min(viewportWidth / width, viewportHeight / height);

        left = (viewportWidth - width) / 2 - left;
        top = (viewportHeight - height) / 2 - top;

        width = Math.floor(width * scale);
        height = Math.floor(height * scale);

        return {
            transform: `translate(${left}px, ${top}px) scale(${scale})`
        };
    }

    componentWillReceiveProps (props) {
        const {autoPlay} = props;

        this.setState({
            autoPlay
        });
    }

    render () {
        const {images, index, isZoomed, autoPlay, style} = this.state;
        const {srcSet} = this.props;

        const classZoomed = isZoomed ? 'is-zoomed' : '';
        const classPlaying = autoPlay ? 'is-playing' : '';

        return (
            <section
                className={`Carousel ${classZoomed} ${classPlaying}`}
                style={style}
                onClick={() => this._zoom()}>
                <ul className="Carousel-list">
                    {images.map((image, i) => {
                        const {key, src, caption} = image;
                        const state = i === index ? 'is-active' : '';
                        return (
                            <li key={key}
                                className={`Carousel-item ${state}`}>
                                <Picture src={src} alt={caption} srcSet={srcSet} />
                            </li>
                        );
                    })}
                </ul>
            </section>
        );
    }

    toggleAutoPlay () {
        const {autoPlay, count} = this.state;

        if (autoPlay && count > 1) {
            this._cueNext();
        } else {
            this._cancel();
        }
    }

    componentDidUpdate (prevProps, prevState) {
        this.toggleAutoPlay();
    }

    componentDidMount () {
        this.toggleAutoPlay();
    }

    componentWillUnmount () {
        this._cancel();
    }
}

export {Carousel as default};
