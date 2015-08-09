// import {includes} from 'lodash';
import React from 'react';
import Filter from './Filter';
import Project from './Project';
import {store} from '../model/store';

class Work extends React.Component {

    // constructor (props) {
    //     super(props);
    //
    //     // this._onChange = this._onChange.bind(this);
    // }

    // state = {
    //     projects: store.getProjects(),
    //     filters: []
    // }

    // componentDidMount () {
    //     store.addChangeListener(this._onChange);
    // }
    //
    // componentWillUnmount () {
    //     store.removeChangeListener(this._onChange);
    // }

    // _onChange () {
    //     this.setState({
    //         filters: store.getFilters()
    //     });
    // }

    // _getFilteredProjects (filters) {
    //     if (filters && filters.length) {
    //         const {projects} = this.state;
    //         return projects.filter((project) => (
    //             project.tags.some((item) => includes(filters, item.slug))
    //         ));
    //     }
    //     return this.state.projects;
    // }

    render () {
        const {project, filter} = this.props;
        // const {filters} = this.state;
        // const projects = this._getFilteredProjects(filters);
        const projects = store.getFilteredProjects(filter);

        return (
            <section className="Work">
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
