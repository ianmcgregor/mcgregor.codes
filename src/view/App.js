import React from 'react';
import {connect} from 'react-redux';
import track from '../utils/track';
import Header from './Header';
import Work from './Work';
import About from './About';
import Contact from './Contact';
import getScrollTop from 'usfl/dom/getScrollTop';
import animScrollTo from '../utils/animScrollTo';
import scroll from 'usfl/dom/scroll';
import resize from 'usfl/dom/resize';
import eventBus from 'usfl/events/eventBus';
import Router from '../utils/Router';
import renderDocTitle from '../utils/renderDocTitle';
import {setMounted, setPath, setSectionFromScroll} from '../actions';

class App extends React.Component {
    constructor (props) {
        super(props);

        const {dispatch} = props;
        this.router = new Router();
        this.router.on('pop', pathname => dispatch(setPath(pathname)));
        dispatch(setPath(this.router.path));

        this._onScroll = this._onScroll.bind(this);
        this._updateSections = this._updateSections.bind(this);
    }

    _onScroll(y) {
        const {dispatch} = this.props;

        const scrollPos = getScrollTop();

        if (scrollPos < 10) {
            dispatch(setSectionFromScroll(''));
            return;
        }

        let sectionSlug = '';
        this.sections.forEach(section => {
            const top = scrollPos > section.top - window.innerHeight / 2;
            const bottom = scrollPos < section.bottom;
            if (top && bottom) {
                sectionSlug = section.slug;
            }
        });
        dispatch(setSectionFromScroll(sectionSlug));
    }

    _updateSections() {
        const {sections} = this.props;
        this.sections = sections.map(section => {
            const {slug} = section;
            const el = document.querySelector(`[data-path="${slug}"]`);
            const top = el.offsetTop;
            const bottom = top + el.offsetHeight;
            return {
                slug,
                el,
                top,
                bottom
            };
        });
    }

    render () {
        const {mounted, path, project, section, sections, tag} = this.props;

        document.title = renderDocTitle(this.props);

        this.router.push(path);

        return (
            <div className="App">
                <Header sections={sections} currentSection={section} />
                <Work tag={tag} project={project} first={!mounted} />
                <About/>
                <Contact/>
            </div>
        );
    }

    _scrollToEl (path) {
        if (this.tween) {
            this.tween.kill();
        }

        const parts = path.toLowerCase().split('/').filter((part) => !!part);

        while (parts.length) {
            const slug = parts.pop();
            const el = slug && document.querySelector(`[data-path="${slug}"]`);
            if (el) {
                eventBus.off('scroll', this._onScroll);
                const {top} = el.getBoundingClientRect();
                const y = top + getScrollTop();
                this.tween = animScrollTo(y, 1, () => {
                    eventBus.on('scroll', this._onScroll);
                });
                break;
            }
        }
    }

    componentDidUpdate (prevProps, prevState) {
        const {path, fromScroll} = this.props;

        track.page(path);

        if (!fromScroll) {
            this._scrollToEl(path);
        }
    }

    componentDidMount () {
        const {dispatch, path} = this.props;

        dispatch(setMounted());

        this.router.replace(path);

        scroll();
        resize();

        eventBus.on('scroll', this._onScroll);
        eventBus.on('scrollend', this._updateSections);
        eventBus.on('resize', this._updateSections);
        this._updateSections();

        this._scrollToEl(this.props.path);
    }
}

export default connect(
  state => state
)(App);
