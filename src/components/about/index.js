import React from 'react';
import {connect} from 'react-redux';
import {toggleTech} from '../../actions';
import Title from '../title';
import markdown from '../../utils/markdown';

function About({dispatch, about, showTech}) {

    return (
        <article className="About u-padH u-links">
            <section className="About-info u-font-md">
                <Title slug="about"/>
                {about.map((p, i) => <p key={i}>{markdown(p)}</p>)}
            </section>
            <p className="About-tech">
                <button
                    className="Header-link u-link"
                    type="button"
                    onClick={() => dispatch(toggleTech())}>
                    {showTech ? 'Hide' : 'Show'} tech stack
                </button>
            </p>
        </article>
    );
}

export default connect(
    state => ({
        about: state.about,
        showTech: state.showTech
    })
)(About);
