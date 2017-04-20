import React from 'react';
// import Boids from '../components/Boids';
import Link from '../components/Link';
import {connect} from 'react-redux';

function Header(props) {
    const {currentSection, sections} = props;

    return (
        <header className="Header u-padH" data-path="">
            <Link to="/" currentSection={currentSection} className="Header-titleLink" activeClassName="is-active">
                <h1 className="Header-title">
                    M<sup>c</sup>Gregor Codes
                </h1>
            </Link>
            <nav className="Header-nav">
                <ul className="Header-menu">
                    {sections.filter(section => !!section.slug).map((section, i) => {
                        return (
                            <li className="Header-menuItem" key={`Header-menuItem${i}`}>
                                <Link
                                    to={`/${section.slug}/`}
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

export default connect(
  state => state
)(Header);
