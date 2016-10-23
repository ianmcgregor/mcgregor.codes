import React from 'react';
import Info from './Info';
import Picture from './Picture';
import {selectProject} from '../model/actions';

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
                className={'Thumb' + (selected ? ' is-selected' : '')}
                data-path={slug}
                onClick={selected ? null : selectProject.bind(undefined, slug)}>
                <div className="Thumb-image" ref={(img) => this._img = img}>
                    <Picture src={src} alt={caption} srcSet={srcSet} />
                </div>
                <Info project={project} filter={filter} />
            </div>
        );
    }
}
