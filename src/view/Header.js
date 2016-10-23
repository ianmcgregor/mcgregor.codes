import React from 'react';
import {Link, IndexLink} from 'react-router';
import Boids from '../components/Boids';

class Header extends React.Component {

    render () {

        const {pages} = this.props;

        return (
            <header className="Header u-padH">
                <IndexLink to="/" className="Header-titleLink" activeClassName="is-active">
                    <h1 className="Header-title">
                        M<sup>c</sup>Gregor Codes
                    </h1>
                </IndexLink>
                <nav className="Header-nav">
                    <ul className="Header-menu">
                        {pages.map((page, i) => {
                            return (
                                <li className="Header-menuItem" key={'Header-menuItem' + i}>
                                    <Link to={page.route} className="Header-link u-link" activeClassName="is-active">
                                        {page.title}
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
}

export {Header as default};
