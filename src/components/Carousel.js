import React from 'react';
import ReactDOM from 'react-dom';
import Picture from './Picture';
import swipe from '../utils/swipe';

class Carousel extends React.Component {

    constructor (props) {
        super(props);

        this.state = this._getState(props);
        this.state.swiper = swipe(null, 5);

        this._prev = this._prev.bind(this);
        this._next = this._next.bind(this);
    }

    static propTypes = {
        images: React.PropTypes.array.isRequired,
        autoPlay: React.PropTypes.bool.isRequired
    }

    _getState (props) {
        const {images, autoPlay} = this.props;
        const index = 0;
        const count = images.length;
        const center = count / 2 - 0.5;
        return {
            images,
            count,
            index,
            center,
            autoPlay
        };
    }

    _prev () {
        let index = this.state.index - 1;
        if (index < 0) {
            index = 0;
        }
        this.setState({
            index
        });
    }

    _next () {
        let index = this.state.index + 1;
        if (index === this.state.count) {
            index = this.state.count - 1;
        }
        this.setState({
            index
        });
    }

    _getClassState (i) {
        const {index} = this.state;
        if (i < index) {
            return 'is-left';
        }
        if (i === index + 1) {
            return 'is-right is-first';
        }
        if (i > index) {
            return 'is-right';
        }
        return 'is-centered';
    }

    _getBtnClassName (isDisabled, isRight) {
        const state = isDisabled ? 'is-disabled' : '';
        const modifier = isRight ? 'Carousel-navButton--right' : '';
        return `Carousel-navButton ${state} ${modifier}`;
    }

    componentWillReceiveProps (props) {
        this.setState(this._getState(props));
    }

    render () {
        const {index, center, images, count} = this.state;
        const x = (center - index) * 100;
        const transform = `translateX(${x}%)`;
        const style = {
            WebkitTransform: transform,
            transform: transform
        };
        const classNamePrev = this._getBtnClassName(index === 0);
        const classNameNext = this._getBtnClassName(index === count - 1, true);

        return (
            <div className="Carousel">
                <div className="Carousel-inner">
                    <ul className="Carousel-imageList" style={style}>
                        {images.map((image, i) => {
                            const {key, src, caption} = image;
                            const state = this._getClassState(i);
                            return (
                                <li key={key}
                                    className={`Carousel-imageItem ${state}`}>
                                    <Picture src={src} alt={caption} />
                                    {/*
                                        <p style={{
                                        position: 'absolute',
                                        top: '10px',
                                        left: '10px',
                                        backgroundColor: 'white'
                                    }}>{src.slice(src.lastIndexOf('/') + 1)}</p>
                                    */}
                                </li>
                            );
                        })}
                    </ul>
                    <nav className="Carousel-nav">
                        <button className={classNamePrev} onClick={this._prev}>
                            <span className="Icon Icon--left"></span>
                        </button>
                        <button className={classNameNext} onClick={this._next}>
                            <span className="Icon Icon--right"></span>
                        </button>
                    </nav>
                </div>
            </div>
        );
    }

    componentDidMount () {
        const {swiper, autoPlay} = this.state;

        swiper.listen(ReactDOM.findDOMNode(this))
            .on('left', this._next)
            .on('right', this._prev);

        if (autoPlay) {
            // window.requestAnimationFrame(
            //     this._next
            // );
            window.setTimeout(
                this._next, 100
            );
        }
    }

    componentWillUnmount () {
        console.debug('componentWillUnmount', this.state.swiper);
        if (this.state.swiper) {
            this.state.swiper.destroy();
        }
    }
}

export {Carousel as default};
