import React from 'react';
import Filter from './Filter';
import {store} from '../model/store';

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
                        <span className="Info-year u-font-xsm">
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
                    <div className="Info-link u-pad">
                        <a className="u-link" href={link} target="_blank">
                            <span className="Info-linkLabel u-font-xsm">View Project</span>
                            <span className="Icon Icon--link" />
                        </a>
                    </div>
                    <button
                        className="Info-close u-pad"
                        onClick={() => store.selectProject(null)}>
                        <span className="Icon Icon--close">Close</span>
                    </button>
                </div>
            </section>
        );
    }
}
