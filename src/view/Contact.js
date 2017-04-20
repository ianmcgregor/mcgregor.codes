import React from 'react';
import {connect} from 'react-redux';

function Contact(props) {
    const {contacts} = props;

    return (
        <article className="Contact u-padH" data-path="contact">
            <h2>Contact</h2>
            <ul>
                {contacts.map((contact, i) => {
                    return (
                        <li key={`contact${i}`}>
                            <a
                                className="Contact-link u-link"
                                href={contact.href}
                                target={contact.target}>
                                {contact.label}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </article>
    );
}

export default connect(
  state => state
)(Contact);
