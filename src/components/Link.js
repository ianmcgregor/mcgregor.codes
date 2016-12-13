import React from 'react';
import {setPath} from '../model/actions';

export default function Link(props) {
    const {className, currentSection, children, path, activeClassName} = props;
    const isActive = currentSection && path.indexOf(currentSection) > -1;
    const classes = isActive ? `${className} ${activeClassName}` : className;

    return (
        <button className={classes} onClick={setPath.bind(undefined, path)}>
            {children}
        </button>
    );
}
