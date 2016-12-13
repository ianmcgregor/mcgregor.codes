import {dispatcher} from '../model/store';
import constants from '../model/constants';

function toggleFilter(slug) {
    const type = constants.ACTION_TOGGLE_FILTER;
    dispatcher.dispatch({
        type,
        slug
    });
}

function selectProject(slug) {
    const type = constants.ACTION_SELECT_PROJECT;
    dispatcher.dispatch({
        type,
        slug
    });
}

function setPath(path) {
    const type = constants.ACTION_SET_PATH;
    dispatcher.dispatch({
        type,
        path
    });
}

function setMounted() {
    const type = constants.ACTION_SET_MOUNTED;
    dispatcher.dispatch({
        type
    });
}

export {toggleFilter, selectProject, setPath, setMounted};
