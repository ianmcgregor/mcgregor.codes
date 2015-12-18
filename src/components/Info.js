import React from 'react';
import Filter from './Filter';

class Info extends React.Component {

    static propTypes = {
        filter: React.PropTypes.string,
        layout: React.PropTypes.string.isRequired,
        project: React.PropTypes.shape({
            title: React.PropTypes.string.isRequired,
            year: React.PropTypes.number.isRequired,
            text: React.PropTypes.array.isRequired,
            tags: React.PropTypes.array.isRequired
        })
    }

    render () {
        const {project, filter, layout} = this.props;
        const {title, year, text, tags, link} = project;

        return (
            <section className={`Info Info--${layout}`}>
                <div className="Info-inner">
                    <header className="Info-header" ref="info">
                        <h3 className="Info-title">
                            {title}
                        </h3>
                        <p className="Info-year">
                            {year}
                        </p>
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
                </div>
            </section>
        );
    }
}

export {Info as default};
