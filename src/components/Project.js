import React from 'react';
import ReactDOM from 'react-dom';
import Carousel from './Carousel';
import Info from './Info';

class Project extends React.Component {

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
        const {project, filter, srcSet} = this.props;
        const {images} = project;

        return (
            <article className="Project">
                <div className="Project-carousel">
                    <Carousel images={images} srcSet={srcSet} />
                </div>
                <Info project={project} filter={filter}/>
            </article>
        );
    }

    componentDidMount () {
        const el = ReactDOM.findDOMNode(this);
        window.requestAnimationFrame(
            () => el.classList.add('is-project')
        );
    }
}

export {Project as default};
