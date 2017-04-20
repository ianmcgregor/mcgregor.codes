const {assign} = Object;

export default function assignPath(state, updates) {
    const newState = assign({}, state, updates);
    const {currentProject, currentSection, defaultTag, tag} = newState;

    let path = '/';

    if (currentSection && currentSection.slug) {
        path += `${currentSection.slug}/`;
    }

    if (currentSection.isWork && tag !== defaultTag) {
        path += `${tag}/`;
    }

    if (currentSection.isWork && currentProject) {
        path += `${currentProject.slug}/`;
    }

    return assign(newState, {path});
}
