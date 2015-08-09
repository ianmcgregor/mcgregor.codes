import React from 'react';
import {Link} from 'react-router';

class Header extends React.Component {

    render () {
        return (
            <header className="Header">
                <h1 className="Header-title">McGregor Codes</h1>
                <nav>
                    <ul className="Header-menu">
                        <li className="Header-menuItem">
                            <Link className="Header-link u-link" to="projects">
                                Projects
                            </Link>
                        </li>
                        <li className="Header-menuItem">
                            <Link className="Header-link u-link" to="services">
                                Services
                            </Link>
                        </li>
                        <li className="Header-menuItem">
                            <Link className="Header-link u-link" to="contact">
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
