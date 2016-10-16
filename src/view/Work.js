import React from 'react';
import Filter from '../components/Filter';
import Thumb from '../components/Thumb';
import {store} from '../model/store';
// import {debounce} from 'lodash';
// import getScrollTop from '../utils/getScrollTop';

export default class Work extends React.Component {

    static propTypes = {
        filter: React.PropTypes.string
    }

    constructor (props) {
        super(props);

        // this._onScroll = debounce(this._onScroll.bind(this), 300);
    }

    // state = {
    //     scrollTop: 0
    // }

    // _onScroll () {
    //     const scrollTop = getScrollTop();
    //
    //     this.setState({
    //         scrollTop
    //     });
    // }

    render () {
        const {filter, project} = this.props;
        // const {scrollTop} = this.state;
        const scrollTop = 0;
        const projects = store.getFilteredProjects(filter);
        const srcSet = store.getSrcSet();

        return (
            <article className="Work">
                <h2 id="work" data-path="work">Work</h2>
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

    // componentDidMount () {
    //     window.addEventListener('scroll', this._onScroll);
    // }
    //
    // componentWillUnmount () {
    //     window.removeEventListener('scroll', this._onScroll);
    // }
}
