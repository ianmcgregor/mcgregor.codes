import React from 'react';
import {Link, IndexLink} from 'react-router';

class Header extends React.Component {

    render () {

        const {title, pages} = this.props;

        return (
            <header className="Header">
                <IndexLink to="/" className="Header-titleLink" activeClassName="is-active">
                    <h1 className="Header-title">
                        {title}
                    </h1>
                </IndexLink>
                <nav>
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
            </header>
        );
    }
}

export {Header as default};
