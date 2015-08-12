'use strict';

import React from 'react';
import Router from 'react-router';
import {DefaultRoute, NotFoundRoute, Route, Redirect} from 'react-router';
import App from './components/App';
import Services from './components/Services';
import Contact from './components/Contact';
import Work from './components/Work';
import track from './utils/track';

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
        <Redirect from="/" to="projects"/>
    </Route>
);

function getDocTitle(pathname) {
    const title = 'CGREGOR CODES';
    return title + pathname
        .replace('_', ' ')
        .replace('/', ' / ')
        .toUpperCase();
}

// init Google Analytics
track.init('UA-66215708-1');

// Router.run(routes, Router.HistoryLocation, (Handler, state) => {
Router.run(routes, (Handler, state) => {
    console.debug('--> Router.run pathname:', state.pathname, 'params:', JSON.stringify(state.params, null, 2));

    React.initializeTouchEvents(true);
    React.render(<Handler {...state}/>, container);

    document.title = getDocTitle(state.pathname);
    track.page(state.pathname);
});
