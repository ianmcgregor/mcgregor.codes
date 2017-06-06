import capitalize from 'usfl/string/capitalize';

export default function renderDocTitle(title, pathname) {
    return title + pathname.split('/')
        .map(part => part.replace('_', ' '))
        .map(part => capitalize(part))
        .join(' / ');
}
