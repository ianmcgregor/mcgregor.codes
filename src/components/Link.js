import React from 'react';
import {connect} from 'react-redux';
import {setPath} from '../actions';

function Link(props) {
    const {dispatch, className, currentSection, children, to, activeClassName} = props;
    const isActive = currentSection && to.indexOf(currentSection) > -1;
    const classes = isActive ? `${className} ${activeClassName}` : className;

    return (
        <button className={classes} onClick={() => dispatch(setPath(to))}>
            {children}
        </button>
    );
}

export default connect(
  state => state
)(Link);
