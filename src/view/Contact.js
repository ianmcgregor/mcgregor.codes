import React from 'react';
import {store} from '../model/store';

export default function Contact() {
    const contacts = store.getContacts();

    return (
        <article className="Contact u-padH">
            <h2 id="contact" data-path="contact">Contact</h2>
            <ul>
            {contacts.map((contact, i) => {
                return (
                    <li key={'contact' + i}>
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
