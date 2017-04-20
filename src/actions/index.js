export const SELECT_PROJECT = 'SELECT_PROJECT';
export const SELECT_SECTION = 'SELECT_SECTION';
export const SET_MOUNTED = 'SET_MOUNTED';
export const SET_PATH = 'SET_PATH';
export const TOGGLE_FILTER = 'TOGGLE_FILTER';
export const TOGGLE_SKILLS = 'TOGGLE_SKILLS';

export function selectProject(slug) {
    return {
        type: SELECT_PROJECT,
        slug
    };
}

export function setSectionFromScroll(slug) {
    return {
        type: SELECT_SECTION,
        slug
    };
}

export function setMounted() {
    return {
        type: SET_MOUNTED
    };
}

export function setPath(path) {
    return {
        type: SET_PATH,
        path
    };
}

export function toggleFilter(slug) {
    return {
        type: TOGGLE_FILTER,
        slug
    };
}

export function toggleSkills() {
    return {
        type: TOGGLE_SKILLS
    };
}
