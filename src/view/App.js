import React from 'react';
import {store} from '../model/store';
import track from '../utils/track';
import Header from './Header';
import Work from './Work';
import About from './About';
import Contact from './Contact';
import getScrollTop from '../utils/getScrollTop';
import animScrollTo from '../utils/animScrollTo';

class App extends React.Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    constructor (props) {
        super(props);

        this._onChange = this._onChange.bind(this);
    }

    _onChange () {
        const filter = store.getFilter();
        const selectedProject = store.selectedProject;
        const base = 'work';

        if (selectedProject) {
            this.context.router.push(`/${base}/${selectedProject}`);
        } else if (filter) {
            this.context.router.push(`/${base}/filter/${filter}`);
        } else {
            this.context.router.push(`/${base}`);
        }
    }

    render () {

        const {filter, project} = this.props.params;

        console.debug('App.render', filter, project);

        if (!filter) {
            store.clearFilters();
        }

        if (!project) {
            store.selectedProject = null;
        }

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

    _pathChanged () {
        const {location} = this.props;
        const {pathname} = location;
        // console.debug('Route changed: ', pathname);

        document.title = this._getDocTitle(pathname);

        track.page(pathname);

        console.log('componentDidUpdate', path);
        if (this.tween) {
            this.tween.kill();
        }
        // const path = location.pathname.slice(1);
        const path = location.pathname.slice(location.pathname.lastIndexOf('/') + 1);
        console.debug('---> path', path);
        // console.debug(document.querySelector(`[data-path="${path}"]`));
        if (path && document.getElementById(path)) {
            const el = document.getElementById(path);
            const {top} = el.getBoundingClientRect();
            const y = top + getScrollTop();
            // const dist = y - getScrollTop();
            // console.log('scroll to:', y, dist);
            this.tween = animScrollTo(y, 1);
        }
    }

    componentDidUpdate () {
        this._pathChanged();
    }

    componentDidMount () {
        store.addChangeListener(this._onChange);
        this._pathChanged();
    }

    componentWillUnmount () {
        store.removeChangeListener(this._onChange);
    }
}

export {App as default};
