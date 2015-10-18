'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, Redirect} from 'react-router';
import App from './components/App';
import Services from './components/Services';
import Contact from './components/Contact';
import Work from './components/Work';
import {createHistory} from 'history';

const container = document.querySelector('[data-region="container"]');

const routes = (
    <Route path="/" component={App} ignoreScrollBehavior={true}>
        <Route path="services" component={Services}/>
        <Route path="projects" component={Work}>
            <Route path="filter/:filter" component={Work}/>
            <Route path=":project" component={Work}/>
        </Route>
        <Route path="contact" component={Contact}/>
        <IndexRoute component={Work}/>
        <Route path="*" component={Work}/>
        <Redirect from="/" to="/projects"/>
    </Route>
);

const history = createHistory();

ReactDOM.render(<Router history={history}>{routes}</Router>, container);
