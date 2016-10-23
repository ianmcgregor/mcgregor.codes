import React from 'react';
import {store} from '../model/store';
import track from '../utils/track';
import Header from './Header';
import Work from './Work';
import About from './About';
import Contact from './Contact';
import getScrollTop from 'usfl/dom/getScrollTop';
import animScrollTo from '../utils/animScrollTo';

class App extends React.Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    constructor (props) {
        super(props);

        this._onChange = this._onChange.bind(this);
    }

    state = {
        filter: null,
        project: null
    }

    _onChange () {
        const filter = store.getFilter();
        const project = store.getSelectedProject();
        const base = 'work';

        console.debug('App._onChange', filter, project);

        this.setState({
            project,
            filter
        });

        if (project) {
            this.context.router.push(`/${base}/${project}`);
        } else if (filter !== store.getDefaultFilter()) {
            this.context.router.push(`/${base}/filter/${filter}`);
        } else {
            this.context.router.push(`/${base}`);
        }
    }

    render () {

        const {filter, project} = this.state;

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
            .replace('_', ' ')
            .replace('/', ' / ')
            .toUpperCase();
    }

    _pathChanged (projectTransition = false) {
        const {location} = this.props;
        const {pathname} = location;
        // console.debug('Route changed: ', pathname);

        document.title = this._getDocTitle(pathname);

        track.page(pathname);

        console.log('componentDidUpdate', path);
        if (this.tween) {
            this.tween.kill();
        }
        const path = location.pathname.slice(location.pathname.lastIndexOf('/') + 1);
        console.debug('---> path', path);
        const el = path && document.querySelector(`[data-path="${path}"]`);
        if (el) {
            if (projectTransition) {
                window.setTimeout(() => this.scrollToEl(el), 500);
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
        this._pathChanged(prevState.project && this.state.project);
    }

    componentDidMount () {
        store.addChangeListener(this._onChange);
        const {filter, project} = this.props.params;
        store.toggleFilter(filter);
        store.selectProject(project);
        this._pathChanged();
    }

    componentWillUnmount () {
        store.removeChangeListener(this._onChange);
    }
}

export {App as default};
