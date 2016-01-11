import React from 'react';

export default function Footer() {
    return (
        <footer className="Footer">
            <ul className="Footer-list">
                <li>
                    <a className="Footer-link u-link"
                        href="https://uk.linkedin.com/in/idmcgregor" target="_blank">
                        LinkedIn
                    </a>
                </li>
                <li>
                    <a className="Footer-link u-link"
                        href="https://twitter.com/imcg" target="_blank">
                        Twitter
                    </a>
                </li>
                <li>
                    <a className="Footer-link u-link"
                        href="https://github.com/ianmcgregor" target="_blank">
                        GitHub
                    </a>
                </li>
                <li>
                    <a className="Footer-link u-link"
                        href="https://www.npmjs.com/~ianmcgregor" target="_blank">
                        npm
                    </a>
                </li>
                <li>
                    <a className="Footer-link u-link"
                        href="http://stackoverflow.com/users/1212727/imcg" target="_blank">
                        StackOverflow
                    </a>
                </li>
                <li className="Footer-copyright">
                    © Copyright 2015 McGregor Codes Ltd
                </li>
            </ul>
        </footer>
    );
}
