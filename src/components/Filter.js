import React from 'react';
import {toggleFilter} from '../model/actions';

export default class Filter extends React.Component {

    static propTypes = {
        filter: React.PropTypes.string,
        tags: React.PropTypes.array.isRequired,
        modifier: React.PropTypes.string.isRequired,
        showCount: React.PropTypes.bool.isRequired
    }

    render () {
        const {filter, tags, modifier, showCount} = this.props;

        return (
            <ul className={`Filter ${modifier}`}>
                {tags.filter((tag) => tag.renderable).map((tag) => {
                    const {key, slug, name, count} = tag;
                    const isSelected = slug === filter;
                    const label = showCount ? `${name} [${count}]` : name;
                    const active = isSelected ? 'is-active' : '';

                    return (
                        <li key={key}>
                            <button
                                className={`Filter-item u-font-xsm u-link ${active}`}
                                onClick={toggleFilter.bind(undefined, slug)}>
                                <span className={`Icon Icon--small Icon--${slug}`} />
                                <span className="Filter-label">{label}</span>
                            </button>
                        </li>
                    );
                })}
            </ul>
        );
    }
}
