import React from 'react';
import ReactDOM from 'react-dom';
import Carousel from './Carousel';
import Info from './Info';
import inViewport from '../utils/inViewport';


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

    state = {
        inView: false
    }

    _updateInView () {
        const el = ReactDOM.findDOMNode(this);
        const inView = inViewport(el, -80);

        this.setState({
            inView: inView
        });
    }

    componentWillReceiveProps (nextProps) {
        this._updateInView();
    }

    shouldComponentUpdate (nextProps, nextState) {
        const filterChange = this.props.filter !== nextProps.filter;
        const inViewChange = this.state.inView !== nextState.inView;
        return filterChange || inViewChange;
    }

    render () {
        const {project, filter, srcSet} = this.props;
        const {layout, images} = project;
        const {inView} = this.state;

        return (
            <article className={`Project layout-${layout}`}>
                <div className="Project-carousel">
                    <Carousel images={images} srcSet={srcSet} autoPlay={inView} />
                </div>
                <Info project={project} filter={filter}/>
            </article>
        );
    }

    componentDidMount () {
        window.requestAnimationFrame(
            () => this._updateInView()
        );
    }
}

export {Project as default};
