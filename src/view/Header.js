import React from 'react';
// import Boids from '../components/Boids';
import Link from '../components/Link';

export default function Header(props) {
    const {sections, currentSection} = props;

    return (
        <header className="Header u-padH" data-path="">
            <Link path="/" currentSection={currentSection} className="Header-titleLink" activeClassName="is-active">
                <h1 className="Header-title">
                    M<sup>c</sup>Gregor Codes
                </h1>
            </Link>
            <nav className="Header-nav">
                <ul className="Header-menu">
                    {sections.map((section, i) => {
                        return (
                            <li className="Header-menuItem" key={'Header-menuItem' + i}>
                                <Link
                                    path={`/${section.slug}/`}
                                    currentSection={currentSection}
                                    className="Header-link u-link"
                                    activeClassName="is-active">
                                        {section.title}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            <p className="Header-subtitle">
                Specialist in creative, experiential
                web sites, games and applications.
            </p>
            {/* <Boids /> */}
        </header>
    );
}
