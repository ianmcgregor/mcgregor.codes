import React from 'react';

export default function Contact() {
    return (
        <main className="Contact">
            <ul>
                <li>
                    <a className="Contact-link" href="mailto:ian@mcgregor.codes">
                        ian@mcgregor.codes
                    </a>
                </li>
                <li>
                    <a className="Contact-link" href="https://uk.linkedin.com/in/idmcgregor" target="_blank">
                        @idmcgregor
                    </a> on LinkedIn
                </li>
                <li>
                    <a className="Contact-link" href="https://github.com/ianmcgregor" target="_blank">
                        @ianmcgregor
                    </a> on GitHub
                </li>
                <li>
                    <a className="Contact-link" href="https://www.npmjs.com/~ianmcgregor" target="_blank">
                        @ianmcgregor
                    </a> on npm
                </li>
                <li>
                    <a className="Contact-link" href="https://twitter.com/imcg" target="_blank">
                        @imcg
                    </a> on Twitter
                </li>
                <li>
                    <a className="Contact-link" href="http://stackoverflow.com/users/1212727/imcg" target="_blank">
                        @imcg
                    </a> on StackOverflow
                </li>
            </ul>
        </main>
    );
}
