import React from 'react';
import {Link, IndexLink} from 'react-router';

class Header extends React.Component {

    render () {
        return (
            <header className="Header">
                <IndexLink to="/" className="Header-titleLink" activeClassName="is-active">
                    <h1 className="Header-title">
                        McGregor Codes
                    </h1>
                </IndexLink>
                <nav>
                    <ul className="Header-menu">
                        <li className="Header-menuItem">
                            <Link to="/projects" className="Header-link u-link" activeClassName="is-active">
                                Projects
                            </Link>
                        </li>
                        <li className="Header-menuItem">
                            <Link to="/services" className="Header-link u-link" activeClassName="is-active">
                                Services
                            </Link>
                        </li>
                        <li className="Header-menuItem">
                            <Link to="/contact" className="Header-link u-link" activeClassName="is-active">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export {Header as default};
