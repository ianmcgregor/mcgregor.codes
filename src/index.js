'use strict';

import React from 'react';
import Router from 'react-router';
import {DefaultRoute, NotFoundRoute, Route} from 'react-router';
import App from './components/App';
import Services from './components/Services';
import Contact from './components/Contact';
import Work from './components/Work';

const container = document.querySelector('[data-region="container"]');

const routes = (
    <Route name="home" path="/" handler={App} ignoreScrollBehavior={true}>
        <Route name="services" handler={Services}/>
        <Route name="projects" path="projects" handler={Work}>
            <Route name="filter" path="filter/:filter" handler={Work}/>
            <Route name="project" path=":project" handler={Work}/>
        </Route>
        <Route name="contact" handler={Contact}/>
        <DefaultRoute handler={Work}/>
        <NotFoundRoute handler={Work}/>
    </Route>
);

Router.run(routes, (Handler, state) => {
    React.initializeTouchEvents(true);
    // Router.run(routes, Router.HistoryLocation, (Handler, state) => {
    React.render(<Handler {...state}/>, container);
});
