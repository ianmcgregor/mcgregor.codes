import React from 'react';
import {Link, IndexLink} from 'react-router';

class Header extends React.Component {

    render () {
        return (
            <header className="Header">
                <h1 className="Header-title">McGregor Codes</h1>
                <nav>
                    <ul className="Header-menu">
                        <li className="Header-menuItem">
                            <IndexLink className="Header-link u-link" to="/projects" activeClassName="active">
                                Projects
                            </IndexLink>
                        </li>
                        <li className="Header-menuItem">
                            <Link className="Header-link u-link" to="/services" activeClassName="active">
                                Services
                            </Link>
                        </li>
                        <li className="Header-menuItem">
                            <Link className="Header-link u-link" to="/contact" activeClassName="active">
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
