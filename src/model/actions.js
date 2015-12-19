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

export {toggleFilter, selectProject};
