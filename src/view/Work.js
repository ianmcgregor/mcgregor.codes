import React from 'react';
import Filter from '../components/Filter';
import Project from '../components/Project';
import {store} from '../model/store';

export default function Work(props) {
    const {tag, project, first} = props;
    const projects = store.getFilteredProjects(tag);
    const srcSet = store.getSrcSet();

    return (
        <article className="Work" data-path="work">
            <h2>Work</h2>
            <nav className="Work-tags u-pad">
                <Filter
                    tags={store.getTags()}
                    currentTag={tag}
                    modifier="Filter--work"
                    showCount={true}/>
            </nav>
            <section className="Work-projects">
                {projects.map((p) => (
                    <Project
                        key={p.key}
                        currentTag={tag}
                        project={p}
                        srcSet={srcSet}
                        loaded={first}
                        selected={project === p.slug}/>
                ))}
            </section>
        </article>
    );
}
