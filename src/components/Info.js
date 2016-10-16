import React from 'react';
import Filter from './Filter';
import {Link} from 'react-router';

export default class Info extends React.Component {

    static propTypes = {
        filter: React.PropTypes.string,
        project: React.PropTypes.shape({
            link: React.PropTypes.string.isRequired,
            title: React.PropTypes.string.isRequired,
            year: React.PropTypes.number.isRequired,
            text: React.PropTypes.array.isRequired,
            tags: React.PropTypes.array.isRequired
        })
    }

    render () {
        const {project, filter} = this.props;
        const {link, title, year, text, tags} = project;

        return (
            <section className="Info">
                <header className="Info-header u-padH" ref="info">
                        <h3 className="Info-title">
                            {title}
                        </h3>
                        <span className="Info-year">
                            {year}
                        </span>
                </header>
                <div className="Info-inner">
                    <ul className="Info-text u-padH">
                        {text.map((item) => (
                            <li key={item.key}>{item.value}</li>
                        ))}
                    </ul>
                    <div className="Info-filters u-pad">
                        <Filter
                            filter={filter}
                            tags={tags}
                            modifier="Filter--info"
                            showCount={false}/>
                    </div>
                    <a className="Info-link u-pad" href={link} target="_blank">
                        <span className="Icon Icon--link">View Project</span>
                    </a>
                    <Link to="/work" className="Info-close u-pad">
                        <span className="Icon Icon--close">Close</span>
                    </Link>
                </div>
            </section>
        );
    }
}
