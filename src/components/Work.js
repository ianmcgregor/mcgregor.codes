import React from 'react';
import ReactDOM from 'react-dom';
import Filter from './Filter';
import Project from './Project';
import {store} from '../model/store';
import Boids from './Boids';

class Work extends React.Component {

    componentDidMount () {
        ReactDOM.findDOMNode(this);
    }

    render () {
        const {project, filter} = this.props;
        const projects = store.getFilteredProjects(filter);

        return (
            <section className="Work">
                <Boids/>
                <nav className="Work-tags">
                    <Filter
                        tags={store.getTags()}
                        filter={filter}
                        modifier="Filter--work"
                        showCount={true}/>
                </nav>
                <div className="Work-projects">
                    {projects.map((p) => (
                        <Project
                            key={p.key}
                            filter={filter}
                            project={p}
                            isSelected={project === p.slug}/>
                    ))}
                </div>
            </section>
        );
    }
}

export {Work as default};
