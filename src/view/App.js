import React from 'react';
import {store} from '../model/store';
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
import {setPath, setMounted} from '../model/actions';

export default class App extends React.Component {
    constructor (props) {
        super(props);

        this._onChange = this._onChange.bind(this);
        this._onScroll = this._onScroll.bind(this);
        this._updateSections = this._updateSections.bind(this);

        this.router = new Router();
        setPath(this.router.path);
        this.router.replace(store.getPathName());
        this.router.on('pop', (path) => setPath(path));

        this.state = store.getState();
    }

    _onChange () {
        this.setState(store.getState());
    }

    _onScroll(y) {
        let sel = null;

        this.sections.forEach((section) => {
            const top = getScrollTop() > section.top - window.innerHeight / 2;
            const bottom = getScrollTop() < section.bottom;
            if (top && bottom) {
                sel = section.slug;
            }
        });

        store.setSectionFromScroll(sel || '');
    }

    _updateSections() {
        this.sections = store.getSections().map((section) => {
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

    componentWillReceiveProps (nextProps) {

    }

    render () {
        const {section, tag, project, mounted} = this.state;

        return (
            <div className="App">
                <Header sections={store.getSections()} currentSection={section} />
                <Work tag={tag} project={project} first={!mounted} />
                <About/>
                <Contact/>
            </div>
        );
    }

    _pathChanged () {
        const {title, path, fromScroll} = this.state;

        document.title = title;
        this.router.push(path);
        track.page(path);

        if (!fromScroll) {
            this._scrollToEl(path);
        }
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
        this._pathChanged();
    }

    componentDidMount () {
        setMounted();

        store.addChangeListener(this._onChange);
        this._pathChanged();

        scroll();
        resize();

        eventBus.on('scroll', this._onScroll);
        eventBus.on('scrollend', this._updateSections);
        eventBus.on('resize', this._updateSections);

        this._updateSections();
        this._scrollToEl(this.state.path);
    }

    componentWillUnmount () {
        store.removeChangeListener(this._onChange);
    }
}
