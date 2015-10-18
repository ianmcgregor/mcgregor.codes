import React from 'react';
import Header from './Header';
import Footer from './Footer';
import {store} from '../model/store';
import {History} from 'react-router';

import ReactMixin from 'react-mixin';
import track from '../utils/track';

function getDocTitle(pathname) {
    const title = 'CGREGOR CODES';
    return title + pathname
        .replace('_', ' ')
        .replace('/', ' / ')
        .toUpperCase();
}


@ReactMixin.decorate(History)

class App extends React.Component {

    constructor (props) {
        super(props);

        this._onChange = this._onChange.bind(this);

        // init Google Analytics
        track.init('UA-66215708-1');
    }

    _onChange () {
        const filter = store.getFilter();

        if (filter) {
            this.history.pushState(null, `/projects/filter/${filter}`);
        } else {
            this.history.pushState(null, '/projects');
        }
    }

    render () {

        const {params} = this.props;
        if (!(params.project || params.filter)) {
            store.getFilters().length = 0;
        }
        const {project} = params;
        const filter = params.filter || (project && store.getFilter());

        return (
            <div className="App">
                <Header />
                    {React.cloneElement(this.props.children, {project, filter})}
                <Footer />
            </div>
        );
    }

    _pathChanged () {
        const {pathname} = this.props.location;
        console.debug('Route changed: ', pathname);

        document.title = getDocTitle(pathname);
        track.page(pathname);
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
