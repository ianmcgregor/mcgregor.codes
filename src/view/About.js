import React from 'react';
import {store} from '../model/store';

export default function About() {
    const items = store.getAbout();

    return (
        <article className="About u-padH" data-path="about">
            <section className="About-info">
                <h2>About</h2>
                <p>I love to push the limits of the technologies at hand.
                    I write robust, performant JavaScript and CSS.
                The <a className="u-link" href="https://en.wikipedia.org/wiki/KISS_principle" target="_blank">
                    KISS
                </a>, <a className="u-link" href="https://en.wikipedia.org/wiki/Don't_repeat_yourself" target="_blank">
                    DRY
                </a> and <a className="u-link" href="https://en.wikipedia.org/wiki/You_aren't_gonna_need_it" target="_blank">
                    YAGNI
                </a> principles are always on my mind.
                </p>
                <p>My work has won over 60 major awards from The FWA
                    (SOTY, SOTM x 2), Cannes Lions (Grand Prix, Gold x 3),
                    Webby Awards, Awwwards and D&AD.</p>
            </section>
            <section className="About-list">
                {items.map((item, i) => {
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
            </section>
        </article>
    );
}
