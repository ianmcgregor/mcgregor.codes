import React from 'react';
import Filter from './Filter';
import {History} from 'react-router';
import ReactMixin from 'react-mixin';
import {selectProject} from '../model/actions';

class Info extends React.Component {

    static propTypes = {
        filter: React.PropTypes.string,
        project: React.PropTypes.shape({
            title: React.PropTypes.string.isRequired,
            year: React.PropTypes.number.isRequired,
            text: React.PropTypes.array.isRequired,
            tags: React.PropTypes.array.isRequired
        })
    }

    render () {
        const {project, filter} = this.props;
        const {title, year, text, tags, link, slug} = project;

        return (
            <section className="Info">
                <header className="Info-header" ref="info">
                        <h3 className="Info-title">
                            {title}
                        </h3>
                        <button
                            className="Info-year"
                            onClick={selectProject.bind(undefined, slug)}>
                            {year}
                        </button>
                </header>
                <ul className="Info-text">
                    {text.map((item) => (
                        <li key={item.key}>{item.value}</li>
                    ))}
                </ul>
                <Filter
                    filter={filter}
                    tags={tags}
                    modifier="Filter--info"
                    showCount={false}/>
                <a className="Info-link" href={link} target="_blank">
                    <span className="Icon Icon--link"></span>
                </a>
            </section>
        );
    }
}

ReactMixin.onClass(Info, History);

export {Info as default};
