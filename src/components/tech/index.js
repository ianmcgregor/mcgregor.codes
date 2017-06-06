import React from 'react';
import {connect} from 'react-redux';

function Tech({tech, showTech}) {

    if (!showTech) {
        return null;
    }

    return (
        <section className="Tech u-padH">
            {tech.map((item, i) => {
                return (
                    <ul className="Tech-group" key={i}>
                        <li className="Tech-name">
                            <h3>{item.title}</h3>
                        </li>
                        {item.list.map((li, j) => {
                            return (
                                <li className="Tech-item" key={`${i}${j}`}>
                                    {li}
                                </li>
                            );
                        })}
                    </ul>
                );
            })}
        </section>
    );
}

export default connect(
    state => ({
        tech: state.tech,
        showTech: state.showTech
    })
)(Tech);
