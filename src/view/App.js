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
import eventBus from 'usfl/events/eventBus';

export default class App extends React.Component {

    // static contextTypes = {
    //     router: React.PropTypes.object.isRequired
    // }

    constructor (props) {
        super(props);

        this._onChange = this._onChange.bind(this);
        this._onScroll = this._onScroll.bind(this);

        window.onpopstate = function(event) {
            console.debug('onpopstate:', JSON.stringify(event.state));
            console.debug('path:', document.location.pathname);
        };
    }

    // state = {
    //     filter: null,
    //     project: null
    // }

    _onChange () {
        const filter = store.getFilter();
        const project = store.getSelectedProject();

        console.debug('App._onChange', filter, project);

        this.setState({
            project,
            filter
        });

        let path = '';

        if (filter !== store.getDefaultFilter()) {
            path += `/${filter}`;
        }

        if (project) {
            path += `/${project}`;
        }

        if (path) {
            this.context.router.push(`/work${path}/`);
        }
    }

    _onScroll(y) {
        const els = Array.from(document.querySelectorAll('[data-path]'));
        els.forEach((el) => {
            const {top} = el.getBoundingClientRect();
            // console.log(el.getAttribute('data-path'), (top + getScrollTop()) - y);
        });
    }

    componentWillReceiveProps (nextProps) {

    }

    render () {

        // const {filter, project} = this.state;
        const filter = store.getFilter();
        const project = store.getSelectedProject();

        console.debug('App.render', filter, project);

        return (
            <div className="App">
                <Header pages={store.getPages()} />
                <Work filter={filter} project={project}/>
                <About/>
                <Contact/>
            </div>
        );
    }

    _getDocTitle(pathname) {
        return store.getTitle()
            .concat(pathname)
            .replace(/_/g, ' ')
            .replace(/\//g, ' / ')
            .toUpperCase();
    }

    _pathChanged (projectTransition = false) {
        const {location} = this.props;
        const {pathname} = location;
        console.warn('Route changed: ', pathname);

        document.title = this._getDocTitle(pathname);

        track.page(pathname);

        if (this.tween) {
            this.tween.kill();
        }
        const penultimateSlash = pathname.slice(0, -1).lastIndexOf('/');
        const path = pathname.slice(penultimateSlash + 1).slice(0, -1);
        console.debug('---> path', path);
        this.getElFromPath(path, projectTransition);
    }

    getElFromPath(path, projectTransition) {
        const el = path && document.querySelector(`[data-path="${path}"]`);

        console.debug(el, projectTransition);
        if (el) {
            if (projectTransition) {
                window.setTimeout(() => this.scrollToEl(el), 800);
            } else {
                this.scrollToEl(el);
            }
        }
    }

    scrollToEl (el) {
        const {top} = el.getBoundingClientRect();
        const y = top + getScrollTop();
        this.tween = animScrollTo(y, 1);
    }

    componentDidUpdate (prevProps, prevState) {
        const project = false;
        this._pathChanged(project);
    }

    componentDidMount () {
        store.addChangeListener(this._onChange);
        // const {filter, project} = this.props.params;
        // const {filter, project} = this.state;
        // console.debug('componentDidMount', filter, project);
        // store.toggleFilter(filter, false);
        // store.selectProject(project, true);
        // this._pathChanged(!!project, 1000);

        const path = document.location.pathname;
        const parts = path.split('/').filter((part) => !!part);
        console.debug('url parts', parts);

        const section = parts[parts.length - 1];
        console.debug('section:', section);

        this.getElFromPath(section);

        eventBus.on('scroll', this._onScroll);
        scroll();
    }

    componentWillUnmount () {
        store.removeChangeListener(this._onChange);
    }
}
