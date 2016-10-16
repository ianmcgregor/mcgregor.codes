import React from 'react';
import Picture from './Picture';

export default class Carousel extends React.Component {

    _time = 2000;
    _timeoutId = null;

    constructor (props) {
        super(props);

        this._next = this._next.bind(this);
    }

    static propTypes = {
        images: React.PropTypes.array.isRequired
    }

    state = {
        count: this.props.images.length,
        images: this.props.images,
        index: 0
    }

    _cancel () {
        window.clearTimeout(this._timeoutId);
    }

    _cueNext (isFirst) {
        this._cancel();

        const time = isFirst ? this._time / 2 : this._time;

        this._timeoutId = window.setTimeout(
            this._next,
            time
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

    render () {
        const {images, index} = this.state;
        const {srcSet} = this.props;

        return (
            <section className="Carousel">
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

    _play (isFirst) {
        const {count} = this.state;

        if (count > 1) {
            this._cueNext(isFirst);
        } else {
            this._cancel();
        }
    }

    componentDidMount () {
        this._play(true);
    }

    componentWillUnmount () {
        this._cancel();
    }
}
