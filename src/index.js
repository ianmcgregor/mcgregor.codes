'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute} from 'react-router';
import {createHistory} from 'history';

import App from './components/App';
import Contact from './components/Contact';
import Home from './components/Home';
import Services from './components/Services';
import Work from './components/Work';

const container = document.querySelector('[data-region="container"]');

const routes = (
    <Route path="/" component={App} ignoreScrollBehavior={true}>
        <IndexRoute component={Home}/>
        <Route path="projects" component={Work}>
            <Route path="filter/:filter" component={Work}/>
            <Route path=":project" component={Work}/>
        </Route>
        <Route path="services" component={Services}/>
        <Route path="contact" component={Contact}/>
        <Route path="*" component={Home}/>
    </Route>
);

const history = createHistory();

ReactDOM.render(<Router history={history}>{routes}</Router>, container);
