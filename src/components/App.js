import React from 'react';
import Header from './Header';
import Footer from './Footer';
import {store} from '../model/store';
import {History} from 'react-router';
import ReactMixin from 'react-mixin';
import track from '../utils/track';
import constants from '../model/constants';


// @ReactMixin.decorate(History)
class App extends React.Component {

    constructor (props) {
        super(props);

        this._onChange = this._onChange.bind(this);

        // init Google Analytics
        track.init(constants.GA_ID);
    }

    _onChange () {
        const filter = store.getFilter();

        if (filter) {
            this.history.pushState(null, `/projects/${filter}`);
        } else {
            this.history.pushState(null, '/projects');
        }
    }

    render () {

        const {filter} = this.props.params;

        if (!filter) {
            store.clearFilters();
        }

        return (
            <div className="App">
                <Header />
                    {React.cloneElement(this.props.children, {filter})}
                <Footer />
            </div>
        );
    }

    _getDocTitle(pathname) {
        const title = constants.DOC_TITLE;
        return title + pathname
            .replace('_', ' ')
            .replace('/', ' / ')
            .toUpperCase();
    }

    _pathChanged () {
        const {pathname} = this.props.location;
        // console.debug('Route changed: ', pathname);

        document.title = this._getDocTitle(pathname);

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

ReactMixin.onClass(App, History);

export {App as default};
