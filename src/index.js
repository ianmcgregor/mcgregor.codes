import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from './view/App';
import reducers from './reducers';
import filterProjects from './utils/filterProjects';

import {sections, title} from './model/model.json';
import {contact} from './model/contact.json';
import {about} from './model/about.json';
import {srcSet} from './model/srcset.json';
import {work} from './model/work.json';

import getProjectData from './model/getProjectData';
const {defaultTag, projects, tags} = getProjectData(work);

const store = createStore(reducers, {
    about,
    contacts: contact,
    currentProject: null,
    currentSection: sections[0],
    defaultTag,
    fromScroll: false,
    mounted: false,
    path: '',
    projects,
    sections,
    selectedProjects: filterProjects(projects, defaultTag),
    showSkills: false,
    srcSet,
    tag: defaultTag,
    tags: tags,
    title
});

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('[data-container]')
);
