import {uniqueId, uniq, assign} from 'lodash';
import {Dispatcher} from 'flux';
import {EventEmitter} from 'events';
import constants from './constants';

class Store extends EventEmitter {

    constructor(config) {
        super();

        this.setMaxListeners(1);

        // possible sizes: 1280x720, 960x540, 800x450, 640x360
        const isWide = window.matchMedia(constants.MQ_NARROW).matches;
        const imagePath = 'dist/img/' + (isWide ? '1280x720' : '800x450') + '/';

        function getCaption(project, index) {
            const {text} = project;
            if (!Array.isArray(text)) {
                return text;
            }
            if (index > text.length - 1) {
                return text[text.length - 1];
            }
            return text[index];
        }

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
                count: 0
            };
            tagMap[tag].count++;
            return tagMap[tag];
        }

        function cloneTag(tag) {
            const t = {...tagMap[tag]};
            t.key = uniqueId();
            return t;
        }

        const tags = uniq(config.projects
            .filter((project) => project.visible)
            .reduce((value, project) => value.concat(project.tags), [])
            .map((tag) => getTag(tag)))
            .sort((a, b) => b.count - a.count);

        //  create unique keys and slugs
        const projects = config.projects
            .filter((project) => project.visible)
            .map((project) => (
            assign(project, {
                key: uniqueId(),
                slug: getSlug(project.title),
                layout: (project.layout || 'center'),
                tags: project.tags.map((tag) => cloneTag(tag)),
                thumb: {
                    key: uniqueId(),
                    src: imagePath + project.thumb,
                    caption: project.title
                },
                images: project.images.map((image, i) => ({
                    key: uniqueId(),
                    src: imagePath + image,
                    caption: getCaption(project, i)
                })),
                text: project.text.map((text) => ({
                    key: uniqueId(),
                    value: text
                }))
            })
        ));

        const filters = [];

        this._model = Object.freeze({
            tags,
            projects,
            filters
        });
    }

    _hasFilter (value) {
        // return this._model.filters.indexOf(value) > -1;
        return this._model.filters[0] === value;
    }

    _addFilter (value) {
        if (!this._hasFilter(value)) {
            // this._model.filters.push(value);
            this._model.filters[0] = value;
            // this._emitChange();
            return true;
        }
        return false;
    }

    _emitChange () {
        console.log('emit change');
        this.emit('change');
    }

    addChangeListener (callback) {
        this.on('change', callback);
    }

    removeChangeListener (callback) {
        this.removeListener('change', callback);
    }

    getProjects() {
        return this._model.projects;
    }

    getTags() {
        return this._model.tags;
    }

    getFilters () {
        return this._model.filters;
    }

    getFilter () {
        return this._model.filters[0];
    }

    getFilteredProjects (filter) {
        const {projects} = this._model;
        if (!filter) {
            return projects;
        }
        return projects.filter((project) => (
            project.tags.some((tag) => tag.slug === filter)
        ));
    }

    toggleFilter (value) {
        console.debug('toggleFilter', value);
        if (!this._addFilter(value)) {
            this._model.filters.length = 0;
        }
        // if (!this.hasFilter(value)) {
        //     this._model.filters.push(value);
        // } else {
        //     this._model.filters.splice(this._model.filters.indexOf(value), 1);
        // }
        this._emitChange();
    }
}

const store = new Store(require('./config.json'));
const dispatcher = new Dispatcher();

dispatcher.register(function(action) {
    console.debug('--> dispatcher action:', JSON.stringify(action, null, 2));
    switch (action.type) {
        case constants.ACTION_TOGGLE_FILTER:
            store.toggleFilter(action.slug);
            break;
        default:
    }
});

export {store, dispatcher};
