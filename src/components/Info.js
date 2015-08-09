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
        const {title, year, text, tags} = project;

        return (
            <div className={`Info Info--${layout}`}>
                <div className="Info-inner">
                    <div className="Info-header" ref="info">
                        <h3 className="Info-title">
                            {title}
                        </h3>
                        <p className="Info-year">
                            {year}
                        </p>
                    </div>
                    <ul className="Info-text">
                        {text.map((item) => (
                            <li key={item.key}>{item.value}</li>
                        ))}
                    </ul>
                    <Filter
                        filter={filter}
                        tags={tags}
                        modifier={`Filter--info Filter--info-${layout}`}
                        showCount={false}/>
                </div>
            </div>
        );
    }
}

export {Info as default};
