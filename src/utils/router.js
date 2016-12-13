import {EventEmitter} from 'events';

export default class Router extends EventEmitter {
    constructor() {
        super();

        window.addEventListener('popstate', (event) => {
            this.emit('pop', document.location.pathname);
        });
    }

    push(path) {
        if (path === this.path) {
            return;
        }
        window.history.pushState(null, null, path);
    }

    replace(path) {
        window.history.replaceState(null, null, path);
    }

    get path() {
        return document.location.pathname;
    }
}
