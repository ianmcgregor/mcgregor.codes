import './utils/polyfills';
import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from './components/app';
import reducers from './reducers';
import getProjectData from './utils/getProjectData';

import {sections, title} from './model/structure.json';
import {about} from './model/about.json';
import {contact} from './model/contact.json';
import {tech} from './model/tech.json';
import {srcSet} from './model/srcset.json';
import {work} from './model/work.json';

const {allTag, defaultTag, projects, tags} = getProjectData(work);
const match = `/($|${tags.map(t => t.slug).join('|')})`;
const showTech = false;

const store = createStore(reducers, {
    about,
    allTag,
    contact,
    defaultTag,
    match,
    projects,
    sections,
    showTech,
    srcSet,
    tags,
    tech,
    title
});

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('[data-container]')
);
