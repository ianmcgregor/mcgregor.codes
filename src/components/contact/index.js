import React from 'react';
import {connect} from 'react-redux';
import Title from '../title';

function Contact({contact}) {
    return (
        <article className="Contact u-padH">
            <Title slug="contact"/>
            <ul>
                {contact.map((item, i) => {
                    return (
                        <li className="Contact-item u-font-md" key={i}>
                            <a
                                className="u-link"
                                href={item.href}
                                target={item.target}>
                                {item.label}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </article>
    );
}

export default connect(
    state => ({
        contact: state.contact
    })
)(Contact);
