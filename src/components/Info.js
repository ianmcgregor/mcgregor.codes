import React from 'react';
import Filter from './Filter';
import {store} from '../model/store';

export default function Info(props) {
    const {project, currentTag} = props;
    const {link, title, year, text, tags} = project;

    return (
        <section className="Info">
            <header className="Info-header u-padH">
                    <h3 className="Info-title">
                        {title}
                    </h3>
                    <span className="Info-year u-font-xsm">
                        {year}
                    </span>
            </header>
            <div className="Info-inner">
                <ul className="Info-text u-padH">
                    {text.map((item) => (
                        <li key={item.key}>{item.value}</li>
                    ))}
                </ul>
                <div className="Info-tags u-pad">
                    <Filter
                        currentTag={currentTag}
                        tags={tags}
                        modifier="Filter--info"
                        showCount={false}/>
                </div>
                <div className="Info-link u-pad">
                    <a
                        className="IconButton u-font-xsm u-link"
                        href={link} target="_blank">
                        <span className={'Icon Icon--small Icon--link'} />
                        <span className="IconButton-label">View Project</span>
                    </a>
                </div>
                <button
                    className="Info-close u-pad"
                    onClick={() => store.selectProject(null)}>
                    <span className="Icon Icon--close">Close</span>
                </button>
            </div>
        </section>
    );
}
