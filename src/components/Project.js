import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import Info from './Info';
import Picture from './Picture';
import {selectProject} from '../actions';

class Project extends React.Component {

    constructor (props) {
        super(props);
    }

    // static propTypes = {
    //     project: React.PropTypes.shape({
    //         images: React.PropTypes.array.isRequired
    //     })
    // }

    render () {
        const {dispatch, project, srcSet, selected, currentTag, loaded} = this.props;
        // console.log('project', project);
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
                onClick={selected ? null : () => dispatch(selectProject(slug))}>
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

export default connect(
  state => state
)(Project);
