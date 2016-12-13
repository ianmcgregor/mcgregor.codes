import React from 'react';
import ReactDOM from 'react-dom';
import Info from './Info';
import Picture from './Picture';
import {selectProject} from '../model/actions';

export default class Project extends React.Component {

    constructor (props) {
        super(props);
    }

    static propTypes = {
        project: React.PropTypes.shape({
            images: React.PropTypes.array.isRequired,
            layout: React.PropTypes.string.isRequired
        })
    }

    render () {
        const {project, srcSet, selected, currentTag, loaded} = this.props;
        const {images, slug} = project;
        const [img] = images;
        const picture = img ? <Picture img={img} srcSet={srcSet} /> : '';

        let classNames = 'Project';

        if (loaded) {
            classNames += ' is-loaded';
        }

        if (selected) {
            classNames += ' is-selected';
        }

        return (
            <div
                className={classNames}
                data-path={slug}
                onClick={selected ? null : selectProject.bind(undefined, slug)}>
                <div className="Project-image">{picture}</div>
                <Info project={project} currentTag={currentTag} />
            </div>
        );
    }

    show () {
        const el = ReactDOM.findDOMNode(this);
        window.requestAnimationFrame(() => {
            el.classList.add('is-loaded');
        });
    }

    componentDidMount () {
        this.show();
    }

    componentDidUpdate () {
        this.show();
    }
}
