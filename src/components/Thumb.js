import React from 'react';
import ReactDOM from 'react-dom';
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
        const [img] = images;
        const picture = img ? <Picture img={img} srcSet={srcSet} /> : '';

        return (
            <div
                className={'Thumb' + (selected ? ' is-selected' : '')}
                data-path={slug}
                onClick={selected ? null : selectProject.bind(undefined, slug)}>
                <div className="Thumb-image">{picture}</div>
                <Info project={project} filter={filter} />
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
