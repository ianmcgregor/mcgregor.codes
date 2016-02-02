'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute} from 'react-router';
import {createHistory} from 'history';

import App from './view/App';
import Contact from './view/Contact';
import Home from './view/Home';
import Services from './view/Services';
import Work from './view/Work';

const container = document.querySelector('[data-container]');

const routes = (
    <Route path="/" component={App} ignoreScrollBehavior={true}>
        <IndexRoute component={Home}/>
        <Route path="projects" component={Work}>
            <Route path=":filter" component={Work}/>
        </Route>
        <Route path="services" component={Services}/>
        <Route path="contact" component={Contact}/>
        <Route path="*" component={Home}/>
    </Route>
);

const history = createHistory();

ReactDOM.render(<Router history={history}>{routes}</Router>, container);
