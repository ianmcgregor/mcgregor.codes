import React from 'react';

export default function Services() {
    return (
        <main className="Services">
            <section className="Services-info">
                <p>I love to push the limits of the technologies at hand.
                    I write robust, performant JavaScript and CSS.
                    The KISS, DRY and YAGNI principles are always on my mind.</p>

                <p>My work has won over 60 major awards from The FWA
                    (SOTY, SOTM x 2), Cannes Lions (Grand Prix, Gold x 3),
                    Webby Awards, Awwwards and D&AD.</p>
            </section>
            <section className="Services-list">
                <ul className="Services-group">
                    <li className="Services-name">Basics</li>
                    <li>JavaScript (ES5, ES6 + Babel)</li>
                    <li>CSS (Vanilla, Stylus, Sass)</li>
                    <li>Unit Tests (Karma, Mocha, Chai)</li>
                    <li>Node, Gulp, Webpack</li>
                    <li>Git, GitFlow</li>
                    <li>NGINX, AWS, Digital Ocean</li>
                </ul>
                <ul className="Services-group">
                    <li className="Services-name">Libraries/Apis</li>
                    <li>React, Flux</li>
                    <li>Backbone, Marionette</li>
                    <li>Angular</li>
                    <li>SUIT CSS, PostCSS</li>
                    <li>PIXI.js</li>
                    <li>Three.js</li>
                    <li>Phaser.js</li>
                    <li>Web Audio API</li>
                    <li>Video, Canvas</li>
                    <li>Lodash, Handlebars</li>
                    <li>GSAP, p2.js, Tween.js</li>
                    <li>Browserify, CommonJS</li>
                    <li>Modernizr, jQuery</li>
                    <li>YouTube, Facebook Apis</li>
                    <li>Express, Mongo</li>
                    <li>Socket IO, Passport</li>
                </ul>
                <ul className="Services-group">
                    <li className="Services-name">Non-coding</li>
                    <li>Tech Lead/Lead Dev</li>
                    <li>Specs/Timings</li>
                    <li>Prototyping</li>
                    <li>UX/Wireframes</li>
                </ul>
            </section>
        </main>
    );
}
