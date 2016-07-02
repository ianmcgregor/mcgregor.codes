import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {store} from '../model/store';
import track from '../utils/track';

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

        if (filter) {
            this.context.router.push(`/projects/${filter}`);
        } else {
            this.context.router.push('/projects');
        }
    }

    render () {

        const {filter} = this.props.params;

        if (!filter) {
            store.clearFilters();
        }

        return (
            <div className="App">
                <Header title={store.getTitle()} pages={store.getPages()} />
                    {React.cloneElement(this.props.children, {filter})}
                <Footer />
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

export {App as default};
