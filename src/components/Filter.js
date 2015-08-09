import React from 'react';
import {toggleFilter} from '../model/actions';

class Filter extends React.Component {

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
                {tags.map((tag) => {
                    const {key, slug, name, count} = tag;
                    // const isSelected = includes(filters, slug);
                    const isSelected = slug === filter;
                    const label = showCount ? `${name} (${count})` : name;
                    const active = isSelected ? 'is-active' : '';

                    return (
                        <li key={key}>
                            <button
                                className={`Filter-item u-link ${active}`}
                                onClick={toggleFilter.bind(undefined, slug)}>
                                {label}
                            </button>
                        </li>
                    );
                })}
            </ul>
        );
    }
}

export {Filter as default};
