import React from 'react';
import Filter from './Filter';
import Project from './Project';
import {store} from '../model/store';
import {debounce} from 'lodash';
import getScrollTop from '../utils/getScrollTop';

class Work extends React.Component {

    static propTypes = {
        filter: React.PropTypes.string
    }

    constructor (props) {
        super(props);

        this._onScroll = debounce(this._onScroll.bind(this), 300);
    }

    state = {
        scrollTop: 0
    }

    _onScroll () {
        const scrollTop = getScrollTop();

        this.setState({
            scrollTop
        });
    }

    render () {
        const {filter} = this.props;
        const {scrollTop} = this.state;
        const projects = store.getFilteredProjects(filter);
        const srcSet = store.getSrcSet();

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
                            srcSet={srcSet}
                            scrollTop={scrollTop}/>
                    ))}
                </section>
            </main>
        );
    }

    componentDidMount () {
        window.addEventListener('scroll', this._onScroll);
    }

    componentWillUnmount () {
        window.removeEventListener('scroll', this._onScroll);
    }
}

export {Work as default};
