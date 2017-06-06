import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-micro-router';

function Filter({allTag, defaultTag, tags, modifier, includeAll, showCount}) {

    return (
        <ul className={`Filter ${modifier}`}>
            {tags
                .filter(tag => includeAll || tag.slug !== allTag)
                .map(tag => {
                    const {key, slug, name, count} = tag;
                    const append = showCount ? <span className="Filter-count">[{count}]</span> : '';
                    const to = slug === defaultTag ? '' : slug;
                    const props = slug === defaultTag ? {match: '/$'} : {};

                    return (
                        <li key={key}>
                            <Link
                                {...props}
                                to={`/${to}`}
                                className="IconButton IconButton--filter u-font-sm u-link"
                                activeClassName="is-active">
                                <span className={`Icon Icon--small Icon--${slug}`} />
                                <span className="IconButton-label">{name} {append}</span>
                            </Link>
                        </li>
                    );
                })}
        </ul>
    );
}

export default connect(
    state => ({
        allTag: state.allTag,
        defaultTag: state.defaultTag
    })
)(Filter);
