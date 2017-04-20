import React from 'react';
import {connect} from 'react-redux';
import {toggleSkills} from '../actions';

function About(props) {
    const {dispatch, about, showSkills} = props;

    let btnText = 'Show';
    let skillsList = null;

    if (showSkills) {
        btnText = 'Hide';
        skillsList = <section className="About-list">
            {about.map((item, i) => {
                return (
                    <ul className="About-group" key={`about${i}`}>
                        <li className="About-name">
                            <h3>{item.title}</h3>
                        </li>
                        {item.list.map((li, j) => {
                            return (
                                <li key={`about${i}_${j}`}>{li}</li>
                            );
                        })}
                    </ul>
                );
            })}
        </section>;
    }

    return (
        <article className="About u-padH" data-path="about">
            <section className="About-info">
                <h2>About</h2>
                <p>I love to push the limits of the technologies at hand.
                    I write robust, performant JavaScript and CSS, guided by
                the <a className="u-link" href="https://en.wikipedia.org/wiki/KISS_principle" target="_blank">
                    KISS
                </a>, <a className="u-link" href="https://en.wikipedia.org/wiki/Don't_repeat_yourself" target="_blank">
                    DRY
                </a> and <a className="u-link" href="https://en.wikipedia.org/wiki/You_aren't_gonna_need_it" target="_blank">
                    YAGNI
                </a> principles.
                </p>
                <p>My work has won over 60 major awards from The FWA
                    (SOTY, SOTM x 2), Cannes Lions (Grand Prix, Gold x 3),
                    Webby Awards, Awwwards and D&AD.</p>
            </section>
            <p><button className="Header-link u-link" onClick={() => dispatch(toggleSkills())}>
                {btnText} skills list
            </button></p>
            {skillsList}
        </article>
    );
}

export default connect(
  state => state
)(About);
