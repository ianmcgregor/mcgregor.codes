import uniqueId from 'lodash/uniqueId';
import uniq from 'lodash/uniq';

const imagePath = '/img/';
const videoPath = '/video/';
const defaultTag = 'pinned';
const allTag = 'all';

const filters = [defaultTag, 'website', 'game', 'experiential', 'data', 'film', 'open_source', allTag];

function getSlug(str) {
    return str
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/\W+/g, '');
}

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

export default function getProjectData(projects) {

    const tags = uniq(projects
        .reduce((value, project) => value.concat(project.tags.concat([allTag])), [])
        .filter(tag => !!tag)
        .map(tag => getTag(tag.toLowerCase())))
        .sort((a, b) => filters.indexOf(a.slug) - filters.indexOf(b.slug));

    projects.map(project => (
        Object.assign(project, {
            key: uniqueId(),
            priority: (typeof project.priority === 'number' ? project.priority : 10),
            slug: getSlug(project.title),
            client: project.client,
            video: project.video && project.video.map(v => `${videoPath}${v}`),
            tags: project.tags.concat([allTag])
                .filter(tag => !!tag)
                .map(tag => cloneTag(tag)),
            images: project.images.map(image => ({
                key: uniqueId(),
                src: `${imagePath}${image}`,
                alt: project.title
            })),
            text: project.text.map(text => ({
                key: uniqueId(),
                value: text
            }))
        })
    ));

    return {
        allTag,
        defaultTag,
        projects,
        tags
    };
}
