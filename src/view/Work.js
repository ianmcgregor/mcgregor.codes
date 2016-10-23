import React from 'react';
import Filter from '../components/Filter';
import Thumb from '../components/Thumb';
import {store} from '../model/store';

export default class Work extends React.Component {

    static propTypes = {
        filter: React.PropTypes.string
    }

    constructor (props) {
        super(props);
    }

    render () {
        const {filter, project} = this.props;
        const projects = store.getFilteredProjects(filter);
        const srcSet = store.getSrcSet();

        return (
            <article className="Work">
                <h2 data-path="work">Work</h2>
                <nav className="Work-tags u-pad">
                    <Filter
                        tags={store.getTags()}
                        filter={filter}
                        modifier="Filter--work"
                        showCount={true}/>
                </nav>
                <section className="Work-projects">
                    {projects.map((p) => (
                        <Thumb
                            key={p.key}
                            filter={filter}
                            project={p}
                            srcSet={srcSet}
                            selected={project === p.slug}/>
                    ))}
                </section>
            </article>
        );
    }
}
