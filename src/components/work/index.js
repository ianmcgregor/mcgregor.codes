import React from 'react';
import {connect} from 'react-redux';
import Title from '../title';
import Filter from '../filter';
import Project from '../project';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

const sortByYear = (a, b) => b.year - a.year;
const sortByPriority = (a, b) => a.priority - b.priority;

function Work({srcSet, tags, route, projects, defaultTag, allTag}) {

    const filter = route.params.pop() || defaultTag;

    const sortBy = filter === allTag ? sortByYear : sortByPriority;

    const selectedProjects = projects
        .filter(p => p.tags.some(t => t.slug === filter))
        .sort(sortBy);

    return (
        <article className="Work">
            <Title slug=""/>
            <nav className="Work-tags u-pad">
                <Filter
                    tags={tags}
                    modifier="Filter--work"
                    showCount={false}
                    includeAll={true}
                    filter={filter}
                />
            </nav>
            <CSSTransitionGroup
                className="Work-projects"
                transitionName="Project"
                transitionEnter={true}
                transitionEnterTimeout={700}
                transitionAppear={false}
                transitionLeave={false}>
                {selectedProjects.map((project, i) => (
                    <Project
                        key={project.key}
                        index={i}
                        project={project}
                        srcSet={srcSet}
                        filter={filter}
                    />
                ))}
            </CSSTransitionGroup>
        </article>
    );
}

export default connect(
    state => ({
        allTag: state.allTag,
        defaultTag: state.defaultTag,
        projects: state.projects,
        srcSet: state.srcSet,
        tags: state.tags
    })
)(Work);
