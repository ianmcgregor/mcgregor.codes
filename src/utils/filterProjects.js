function hasTag(project, slug) {
    return project.tags.some((tag) => tag.slug === slug);
}

export default function filterProjects(projects, tag) {
    return projects.filter((project) => {
        return project.slug === tag || hasTag(project, tag);
    })
    .sort((a, b) => a.priority - b.priority);
}
