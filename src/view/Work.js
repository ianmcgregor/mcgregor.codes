import React from 'react';
import Filter from '../components/Filter';
import Project from '../components/Project';
import {connect} from 'react-redux';

function Work(props) {
    const {currentProject, first, selectedProjects, srcSet, tag, tags} = props;

    return (
        <article className="Work" data-path="work">
            <h2>Work</h2>
            <nav className="Work-tags u-pad">
                <Filter
                    tags={tags}
                    currentTag={tag}
                    modifier="Filter--work"
                    showCount={true}
                />
            </nav>
            <section className="Work-projects">
                {selectedProjects.map(project => (
                    <Project
                        key={project.key}
                        currentTag={tag}
                        project={project}
                        srcSet={srcSet}
                        loaded={first}
                        selected={currentProject === project}/>
                ))}
            </section>
        </article>
    );
}

export default connect(
  state => state
)(Work);
