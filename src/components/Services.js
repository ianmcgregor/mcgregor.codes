import React from 'react';

class Services extends React.Component {

    shouldComponentUpdate () {
        return false;
    }

    render () {
        return (
            <main className="Services">
                <section className="Services-info">
                    <h2>About</h2>

                    <p>I write robust, performant JavaScript and CSS.
                    The KISS, DRY and YAGNI principles are always on my mind.</p>

                    <p>I love to push the limits of the technologies at hand.</p>

                    <p>My work has won over 60 major awards including
                    FWA Site of the Year, two FWA Site of the Months, a
                    pride of Cannes Lions including the Grand Prix and
                    several Golds, plus a few Webbys, Awwwards
                    SOTDs and D&AD pencils.</p>
                </section>
                <section className="Services-list">
                    <ul className="Services-group">
                        <li className="Services-name">Basics</li>
                        <li>JavaScript (ES5, ES6 + Babel)</li>
                        <li>CSS (Vanilla, Stylus, Sass)</li>
                        <li>Unit Tests (Karma, Mocha, Chai)</li>
                        <li>Node.js, Gulp, AWS, GitFlow</li>
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
                        <li>p2.js, Tween.js, TweenMax</li>
                        <li>Browserify, CommonJS</li>
                        <li>Modernizr, jQuery</li>
                        <li>YouTube, Facebook Apis</li>
                    </ul>
                    <ul className="Services-group">
                        <li className="Services-name">Non-coding</li>
                        <li>UX</li>
                        <li>Wireframes</li>
                        <li>Tech Specs</li>
                        <li>Timings</li>
                    </ul>
                </section>
            </main>
        );
    }
}

export {Services as default};
