import React from 'react';
import Header from './Header';
import Footer from './Footer';
import {RouteHandler} from 'react-router';
import {store} from '../model/store';

class App extends React.Component {

    constructor (props) {
        super(props);

        this._onChange = this._onChange.bind(this);
    }

    static contextTypes = {
        router: React.PropTypes.func.isRequired
    }

    _onChange () {
        const {router} = this.context;
        const filter = store.getFilter();
        if (filter) {
            router.transitionTo('filter', {filter});
        } else {
            router.transitionTo('projects');
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
                <RouteHandler project={project} filter={filter}/>
                <Footer />
            </div>
        );
    }

    componentDidMount () {
        store.addChangeListener(this._onChange);
    }

    componentWillUnmount () {
        store.removeChangeListener(this._onChange);
    }
}

export {App as default};
