import React from 'react';
import ReactDOM from 'react-dom';
import Filter from './Filter';
import Project from './Project';
import {store} from '../model/store';

class Work extends React.Component {

    componentDidMount () {
        ReactDOM.findDOMNode(this);
    }

    render () {
        const {project, filter} = this.props;
        const projects = store.getFilteredProjects(filter);

        return (
            <main className="Work">
                <nav className="Work-tags">
                    <Filter
                        tags={store.getTags()}
                        filter={filter}
                        modifier="Filter--work"
                        showCount={true}/>
                </nav>
                <section className="Work-projects">
                    {projects.map((p) => (
                        <Project
                            key={p.key}
                            filter={filter}
                            project={p}
                            isSelected={project === p.slug}/>
                    ))}
                </section>
            </main>
        );
    }
}

export {Work as default};
