import React from 'react';
import {toggleFilter} from '../model/actions';

export default function Filter(props) {
    const {currentTag, tags, modifier, showCount} = props;

    return (
        <ul className={`Filter ${modifier}`}>
            {tags.filter((tag) => tag.renderable).map((tag) => {
                const {key, slug, name, count} = tag;
                const isSelected = slug === currentTag;
                const append = showCount ? <span className="Filter-count">[{count}]</span> : '';
                const active = isSelected ? 'is-active' : '';

                return (
                    <li key={key}>
                        <a
                            className={`IconButton u-font-xsm u-link ${active}`}
                            onClick={toggleFilter.bind(undefined, slug)}>
                            <span className={`Icon Icon--small Icon--${slug}`} />
                            <span className="IconButton-label">{name} {append}</span>
                        </a>
                    </li>
                );
            })}
        </ul>
    );
}
