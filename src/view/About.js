import React from 'react';
import {store} from '../model/store';

export default function About() {
    const items = store.getAbout();

    return (
        <article className="About u-padH">
            <section className="About-info">
                <h2 data-path="about">About</h2>
                <p>I love to push the limits of the technologies at hand.
                    I write robust, performant JavaScript and CSS.
                    The KISS, DRY and YAGNI principles are always on my mind.</p>

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
