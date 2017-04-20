import {
    SELECT_PROJECT,
    SELECT_SECTION,
    SET_MOUNTED,
    SET_PATH,
    TOGGLE_FILTER,
    TOGGLE_SKILLS
} from '../actions';

import filterProjects from '../utils/filterProjects';
import assignPath from '../utils/assignPath';
const {assign} = Object;

export default (state = {}, action) => {
    // console.log(action.type);
    console.log('-->', action.type, JSON.stringify(action));
    switch (action.type) {
        case SELECT_PROJECT:
            return assignPath(state, {
                currentProject: state.projects.find(p => p.slug === action.slug),
                currentSection: state.sections.find(s => s.isWork),
                fromScroll: false
            });
        case SELECT_SECTION:
            if (action.slug === state.currentSection.slug) {
                return state;
            }
            return assignPath(state, {
                currentSection: state.sections.find(s => s.slug === action.slug),
                fromScroll: true
            });
        case SET_MOUNTED:
            return assign({}, state, {
                mounted: true
            });
        case SET_PATH:
            return assign({}, state, {
                path: action.path,
                fromScroll: false
            });
        case TOGGLE_FILTER:
            const tag = state.tag === action.slug ? state.defaultTag : action.slug;
            return assignPath(state, {
                tag,
                currentSection: state.sections.find(s => s.isWork),
                selectedProjects: filterProjects(state.projects, tag),
                currentProject: null,
                fromScroll: false
            });
        case TOGGLE_SKILLS:
            return assign({}, state, {
                showSkills: !state.showSkills
            });
        default:
            return state;
    }
};
