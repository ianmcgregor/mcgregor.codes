import React from 'react';
import {connect} from 'react-redux';

function Title({sections, slug}) {
    return (
        <h1>{sections.find(section => section.slug === slug).title}</h1>
    );
}

export default connect(
    state => ({
        sections: state.sections
    })
)(Title);
