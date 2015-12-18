import {debounce} from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import Carousel from './Carousel';
import Info from './Info';
import Overlay from './Overlay';
import Picture from './Picture';
import constants from '../model/constants';
import {History} from 'react-router';
import ReactMixin from 'react-mixin';

let depth = 1;

// @ReactMixin.decorate(History)

class Project extends React.Component {

    constructor (props) {
        super(props);

        this._onScroll = this._onScroll.bind(this);
        this._onResize = debounce(this._onResize.bind(this), 500);
        this._onSelect = this._onSelect.bind(this);
    }

    static propTypes = {
        isSelected: React.PropTypes.bool.isRequired,
        project: React.PropTypes.shape({
            images: React.PropTypes.array.isRequired,
            layout: React.PropTypes.string.isRequired,
            thumb: React.PropTypes.object.isRequired
        })
    }

    state = {
        deepLinked: this.props.isSelected,
        isSelected: false,
        rect: {},
        zIndex: 0
    }

    _inViewport (el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= -20 &&
            rect.top <= window.innerHeight
        );
    }

    _onScroll () {
        if (this._isWide()) {

            if (!this.history.goBack()) {
                this.history.pushState(null, '/projects');
            }
        } else if (!this._inViewport(ReactDOM.findDOMNode(this))) {
            this.setState({
                isSelected: false
            });
        }
    }

    _onResize () {
        console.debug('_onResize');
        this.setState({
            isSelected: true
        });
    }

    _onSelect (project) {
        if (this._isWide()) {
            this.history.pushState(null, `/projects/${project}`);
        } else {
            this.setState({
                isSelected: true
            });
        }
    }

    _getRect () {
        const inner = ReactDOM.findDOMNode(this.refs.inner);
        let {left, top, width, height} = inner.getBoundingClientRect();

        const viewportWidth = Math.min(window.innerWidth, document.documentElement.clientWidth);
        const infoHeight = 140;//ReactDOM.findDOMNode(this.refs.info).offsetHeight;
        const viewportHeight = window.innerHeight - infoHeight;
        const scale = Math.min(viewportWidth / width, viewportHeight / height);

        width = Math.floor(width * scale);
        height = Math.floor(height * scale);

        left = Math.floor((viewportWidth - width) / 2 - left);
        top = Math.floor((viewportHeight - height) / 2 - top);

        return {
            left: `${left}px`,
            top: `${top}px`,
            width: `${width}px`,
            height: `${height}px`
        };
    }

    _isWide () {
        return window.matchMedia(constants.MQ_NARROW).matches;
    }

    componentWillReceiveProps (nextProps) {
        const nextState = {
            isSelected: nextProps.isSelected
        };
        if (nextState.isSelected && this._isWide()) {
            nextState.rect = this._getRect();
            nextState.zIndex = depth++;
        }
        this.setState(nextState);
    }

    componentWillMount () {
    }

    shouldComponentUpdate (nextProps, nextState) {
        return this.state.isSelected || nextState.isSelected;
    }

    componentWillUpdate (nextProps, nextState) {
    }

    render () {
        const {project, filter} = this.props;
        const {layout, slug, thumb, images, link} = project;
        const {isSelected, rect, zIndex} = this.state;
        const cssState = isSelected ? 'is-selected' : '';
        const isWide = this._isWide();
        const {left, top, width, height} = rect;
        const style = isSelected && isWide ? {left, top, width, height, zIndex} : {zIndex};
        const carouselNode = isSelected ? (<Carousel images={images} autoPlay={!isWide}/>) : '';

        return (
            <div className={`Project layout-${layout} ${cssState}`}>
                <div className="Project-inner" style={style} ref="inner">
                    <Picture src={thumb.src} alt={thumb.caption}/>
                    <div className="Project-info">
                        <Info
                            project={project}
                            filter={filter}
                            layout={layout}/>
                    </div>
                    <button
                        className="Project-link"
                        onClick={() => this._onSelect(slug)}/>
                    {carouselNode}
                    <Overlay link={link} onClose={this._onScroll}/>
                </div>
            </div>
        );
    }

    // first post render
    componentDidMount () {
        if (this._isWide() && this.state.deepLinked) {
            window.requestAnimationFrame(() => {
                this.setState({
                    isSelected: true,
                    rect: this._getRect(),
                    zIndex: depth++
                });
            });
            this.state.deepLinked = false;
        }
    }

    // subsequent post render
    componentDidUpdate (prevProps, prevState) {
        window.clearTimeout(this.inTimeout);

        if (this.state.isSelected) {
            this.inTimeout = window.setTimeout(() => {
                window.addEventListener('scroll', this._onScroll);
                window.addEventListener('resize', this._onResize);
            }, 300);
        } else if (prevState.isSelected) {
            window.removeEventListener('scroll', this._onScroll);
            window.removeEventListener('resize', this._onResize);
        }
    }
}

ReactMixin.onClass(Project, History);

export {Project as default};
