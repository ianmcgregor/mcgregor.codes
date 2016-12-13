import uniqueId from 'lodash/uniqueId';
import uniq from 'lodash/uniq';
import assign from 'lodash/assign';
import {Dispatcher} from 'flux';
import {EventEmitter} from 'events';
import constants from './constants';
import capitalize from 'usfl/string/capitalize';

const defaultTag = 'pinned';
const allTag = 'all';
const work = 'work';

class Store extends EventEmitter {
    constructor(json) {
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
                renderable: tag !== allTag
            };
            tagMap[tag].count++;
            return tagMap[tag];
        }

        function cloneTag(tag) {
            const t = {...tagMap[tag]};
            t.key = uniqueId();
            return t;
        }

        json.projects.forEach((project) => {
            project.tags.push(allTag);
        });

        const tags = uniq(json.projects
            .reduce((value, project) => value.concat(project.tags), [])
            .filter((tag) => !!tag)
            .map((tag) => getTag(tag.toLowerCase())))
            // .sort((a, b) => b.count - a.count)
            .sort((a, b) => {
                if (a.slug === defaultTag) {
                    return -1;
                }
                return b.count - a.count;
            });

        //  create unique keys and slugs
        const projects = json.projects
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

        const {title, about, contacts, sections, srcSet} = json;

        this._model = Object.freeze({
            about,
            contacts,
            sections,
            projects,
            tags,
            srcSet,
            title
        });

        this._fromScroll = false;
        this._section = null;
        this._tag = null;
        this._project = null;
        this._mounted = false;
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

    _addFilter (value) {
        if (this._tag === value) {
            return false;
        }
        this._tag = value;
        return true;
    }

    getContacts() {
        return this._model.contacts;
    }

    getAbout() {
        return this._model.about;
    }

    getSections() {
        return this._model.sections;
    }

    getTags() {
        return this._model.tags;
    }

    getSrcSet () {
        return this._model.srcSet;
    }

    _hasTag (project, slug) {
        return project.tags.some((tag) => tag.slug === slug);
    }

    getFilteredProjects (tag) {
        if (!tag) {
            tag = defaultTag;
        }
        const {projects} = this._model;
        return projects
            .filter((project) => {
                return project.slug === tag || this._hasTag(project, tag);
            })
            .sort((a, b) => a.priority - b.priority);
    }

    toggleFilter (value) {
        if (!this._addFilter(value)) {
            this._tag = defaultTag;
        }
        this._section = work;
        this._project = null;
        this._emitChange();
    }

    selectProject (value) {
        this._section = work;
        this._project = value;
        this._emitChange();
    }

    setSectionFromScroll (value) {
        if (this._section === value) {
            return;
        }
        this._fromScroll = true;
        this._section = value;
        this._emitChange();
    }

    getState () {
        const fromScroll = this._fromScroll;
        this._fromScroll = false;
        return {
            path: this.getPathName(),
            title: this.getDocTitle(),
            section: this._section,
            tag: this._tag,
            project: this._project,
            mounted: this._mounted,
            fromScroll
        };
    }

    setStateFromPath (path, emit = true) {
        const parts = path.toLowerCase().split('/').filter((part) => !!part);

        const {sections, tags, projects} = this._model;
        const [a, b, c] = parts;

        const section = sections.filter((s) => s.slug === a)[0];
        this._section = (section && section.slug) || '';

        const tag = tags.filter((t) => t.slug === b)[0];
        this._tag = (tag && tag.slug) || defaultTag;

        const project = projects.filter((p) => p.slug === b || p.slug === c);
        this._project = (project && project.slug) || null;

        if (emit) {
            this._emitChange();
        }
    }

    getPathName() {
        const {_section: section, _tag: tag, _project: project} = this;

        let path = '/';

        if (section) {
            path += `${section}/`;
        }

        if (section === work && tag !== defaultTag) {
            path += `${tag}/`;
        }

        if (section === work && project) {
            path += `${project}/`;
        }

        return path;
    }

    getDocTitle() {
        const {sections, projects} = this._model;
        const section = sections.filter((s) => s.slug === this._section)[0];
        const project = projects.filter((p) => p.slug === this._project)[0];

        const parts = [this._model.title];
        if (section) {
            parts.push(section.title);
        }
        if (this._tag !== defaultTag) {
            parts.push(capitalize(this._tag));
        }
        if (project) {
            parts.push(project.title);
        }
        return parts.join(' / ');
    }

    setMounted() {
        this._mounted = true;
    }
}

const store = new Store(require('./model.json'));
const dispatcher = new Dispatcher();

dispatcher.register(function(action) {
    switch (action.type) {
        case constants.ACTION_TOGGLE_FILTER:
            store.toggleFilter(action.slug);
            break;
        case constants.ACTION_SELECT_PROJECT:
            store.selectProject(action.slug);
            break;
        case constants.ACTION_SET_PATH:
            store.setStateFromPath(action.path);
            break;
        case constants.ACTION_SET_MOUNTED:
            store.setMounted();
            break;
        default:
    }
});

export {store, dispatcher};
