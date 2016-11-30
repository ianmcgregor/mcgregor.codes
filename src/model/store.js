import {uniqueId, uniq, assign} from 'lodash';
import {Dispatcher} from 'flux';
import {EventEmitter} from 'events';
import constants from './constants';

const defaultFilter = 'pinned';
const allFilter = 'all';

class Store extends EventEmitter {

    constructor(config) {
        super();

        this.setMaxListeners(1);

        const imagePath = '/img/';

        function getSlug(str) {
            return str
                .toLowerCase()
                .replace(/\s+/g, '_')
                .replace(/\W+/g, '');
        }

        //  create list of tags with counts
        const tagMap = {};
        function getTag(tag) {
            tagMap[tag] = tagMap[tag] || {
                key: uniqueId(),
                name: tag,
                slug: getSlug(tag),
                count: 0,
                renderable: tag !== allFilter
            };
            tagMap[tag].count++;
            return tagMap[tag];
        }

        function cloneTag(tag) {
            const t = {...tagMap[tag]};
            t.key = uniqueId();
            return t;
        }

        config.projects.forEach((project) => {
            project.tags.push(allFilter);
        });

        const tags = uniq(config.projects
            .reduce((value, project) => value.concat(project.tags), [])
            .filter((tag) => !!tag)
            .map((tag) => getTag(tag.toLowerCase())))
            // .sort((a, b) => b.count - a.count)
            .sort((a, b) => {
                if (a.slug === defaultFilter) {
                    return -1;
                }
                return b.count - a.count;
            });

        //  create unique keys and slugs
        const projects = config.projects
            .map((project) => (
            assign(project, {
                key: uniqueId(),
                priority: project.priority || 10,
                slug: getSlug(project.title),
                layout: (project.layout || 'center'),
                tags: project.tags.filter((tag) => !!tag).map((tag) => cloneTag(tag)),
                images: project.images.map((image, i) => ({
                    key: uniqueId(),
                    src: `${imagePath}${image}`,
                    alt: project.title
                })),
                text: project.text.map((text) => ({
                    key: uniqueId(),
                    value: text
                }))
            })
        ));

        const {title, about, contacts, pages, srcSet} = config;
        const filters = [];

        this._model = Object.freeze({
            about,
            contacts,
            pages,
            projects,
            tags,
            filters,
            srcSet,
            title
        });
    }

    _hasFilter (value) {
        return this._model.filters[0] === value;
    }

    _addFilter (value) {
        if (!this._hasFilter(value)) {
            this._model.filters[0] = value;
            return true;
        }
        return false;
    }

    _emitChange () {
        this.emit('change');
    }

    addChangeListener (callback) {
        this.on('change', callback);
    }

    removeChangeListener (callback) {
        this.removeListener('change', callback);
    }

    getTitle() {
        return this._model.title;
    }

    getContacts() {
        return this._model.contacts;
    }

    getAbout() {
        return this._model.about;
    }

    getPages() {
        return this._model.pages;
    }

    getProjects() {
        return this._model.projects;
    }

    getProjectBySlug(slug) {
        return this._model.projects.filter((p) => p.slug === slug)[0];
    }

    getTags() {
        return this._model.tags;
    }

    getFilters () {
        return this._model.filters;
    }

    getSrcSet () {
        return this._model.srcSet;
    }

    getFilter () {
        return this._model.filters[0];
    }

    clearFilters () {
        this._model.filters[0] = defaultFilter;
    }

    _hasTag (project, filter) {
        return project.tags.some((tag) => tag.slug === filter);
    }

    _hasSlug (project, slug) {
        return project.slug === slug;
    }

    getFilteredProjects (filter) {
        if (!filter) {
            filter = defaultFilter;
        }
        const {projects} = this._model;
        return projects
            .filter((project) => {
                return project.slug === filter || this._hasTag(project, filter);
            })
            .sort((a, b) => a.priority - b.priority);
    }

    toggleFilter (value, emit = true) {
        console.debug('toggleFilter', value);
        if (!this._addFilter(value)) {
            this.clearFilters();
        }
        this._selectedProject = null;
        // if (!this.hasFilter(value)) {
        //     this._model.filters.push(value);
        // } else {
        //     this._model.filters.splice(this._model.filters.indexOf(value), 1);
        // }
        if (emit) {
            this._emitChange();
        }
    }

    selectProject (value, emit = true) {
        console.debug('selectProject', value);
        this._selectedProject = value;
        if (emit) {
            this._emitChange();
        }
    }

    getSelectedProject () {
        return this._selectedProject;
    }

    getDefaultFilter () {
        return defaultFilter;
    }

    getAllFilter () {
        return allFilter;
    }
}

const store = new Store(require('./model.json'));
const dispatcher = new Dispatcher();

dispatcher.register(function(action) {
    console.debug('--> dispatcher action:', JSON.stringify(action, null, 2));
    switch (action.type) {
        case constants.ACTION_TOGGLE_FILTER:
            store.toggleFilter(action.slug);
            break;
        case constants.ACTION_SELECT_PROJECT:
            store.selectProject(action.slug);
            break;
        default:
    }
});

export {store, dispatcher};
