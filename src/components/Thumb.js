import React from 'react';
import Info from './Info';
import Picture from './Picture';
import {selectProject} from '../model/actions';
import Filter from './Filter';
import {Link} from 'react-router';

export default class Thumb extends React.Component {

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
        const {project, srcSet, selected, filter} = this.props;
        const {images, slug} = project;
        const {src, caption} = images[0];

        return (
            <div
                id={slug}
                className={'Thumb' + (selected ? ' is-selected' : '')}
                onClick={selected ? null : selectProject.bind(undefined, slug)}>
                <div className="Thumb-image">
                    <Picture src={src} alt={caption} srcSet={srcSet} />
                </div>
                <Info project={project} filter={filter} />
            </div>
        );
    }
}
