import capitalize from 'usfl/string/capitalize';

export default function renderDocTitle(props) {
    const {title, tag, currentProject, currentSection, defaultTag} = props;

    const parts = [title];
    if (currentSection) {
        parts.push(currentSection.title);
    }
    if (currentSection.isWork && tag !== defaultTag) {
        parts.push(capitalize(tag));
    }
    if (currentSection.isWork && currentProject) {
        parts.push(currentProject.title);
    }
    return parts.join(' / ');
}
