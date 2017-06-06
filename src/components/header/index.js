import React from 'react';
// import Boids from '../boids';
import {connect} from 'react-redux';
import {Link} from 'react-micro-router';
import renderDocTitle from '../../utils/renderDocTitle';
import track from '../../utils/track';

function Header({sections, title, match}) {

    document.title = renderDocTitle(title, document.location.pathname);

    track.page(document.location.pathname);

    return (
        <header className="Header u-padH" data-path="">
            <Link to="/" className="Header-titleLink" activeClassName="is-active">
                <h1 className="Header-title">
                    M<sup>c</sup>Gregor Codes
                </h1>
            </Link>
            <nav className="Header-nav">
                <ul className="Header-menu">
                    {sections.map((section, i) => (
                        <li className="Header-menuItem" key={i}>
                            <Link
                                to={`/${section.slug}`}
                                match={section.slug ? null : match}
                                className="Header-link u-font-md u-link"
                                activeClassName="is-active">
                                    {section.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            {/* <Boids /> */}
        </header>
    );
}

export default connect(
    state => ({
        sections: state.sections,
        title: state.title,
        match: state.match
    })
)(Header);
