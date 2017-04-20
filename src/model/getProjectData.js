import uniqueId from 'lodash/uniqueId';
import uniq from 'lodash/uniq';
import assign from 'lodash/assign';

const imagePath = '/img/';
const defaultTag = 'pinned';
const allTag = 'all';

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

export default function getProjectData(projects) {

    const tags = uniq(projects
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

    projects.map((project) => (
        assign(project, {
            key: uniqueId(),
            priority: project.priority || 10,
            slug: getSlug(project.title),
            layout: (project.layout || 'center'),
            tags: project.tags.concat([allTag]).filter((tag) => !!tag).map((tag) => cloneTag(tag)),
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

    return {
        allTag,
        defaultTag,
        projects,
        tags
    };
}
