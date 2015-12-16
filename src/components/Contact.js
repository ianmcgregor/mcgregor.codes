import React from 'react';

class Contact extends React.Component {

    shouldComponentUpdate () {
        return false;
    }

    render () {
        return (
            <main className="Contact">
                {/*<h2>Contact</h2>
                <p>
                    Message me at <a href="mailto:ian@mcgregor.codes">
                        ian@mcgregor.codes
                    </a> or <a href="https://uk.linkedin.com/in/idmcgregor" target="_blank">
                        linkedin
                    </a>
                </p>

                <h2>Find out more</h2>
                <p>
                    Check out my open-source code at <a href="https://github.com/ianmcgregor" target="_blank">
                        GitHub
                    </a> and <a href="https://www.npmjs.com/~ianmcgregor" target="_blank">
                        npm
                    </a>
                </p>
                <p>
                    Follow me on <a href="https://twitter.com/imcg" target="_blank">
                        Twitter
                    </a>
                </p>
                <p>
                    View my contributions on <a href="http://stackoverflow.com/users/1212727/imcg" target="_blank">
                        StackOverflow
                    </a>
                </p>
                */}
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
}

export {Contact as default};
