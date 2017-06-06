import React from 'react';
import Filter from '../filter';
import markdown from '../../utils/markdown';

export default function Info({project, filter}) {
    const {link, title, year, text, tags, client} = project;

    const viewLink = link ? (
        <div className="Info-link">
            <a
                className="IconButton u-font-sm u-link"
                href={link}
                target="_blank"
                rel="nofollow">
                <span className="Icon Icon--small Icon--link"/>
                <span className="IconButton-label">View</span>
            </a>
        </div>
    ) : null;

    return (
        <section className="Info">
            <header className="Info-header">
                    <h3 className="Info-title">
                        {title}
                    </h3>
                    <span className="Info-year u-font-sm">
                        {year}
                    </span>
            </header>
            <ul className="Info-client u-font-sm">{
                client.map((c, i) => <li key={i}>{c.name}</li>)
            }</ul>
            <article className="Info-text u-links">
                {text.map(item => (
                    <p key={item.key}>{markdown(item.value)}</p>
                ))}
            </article>
            <footer className="Info-footer">
                <div className="Info-tags">
                    <Filter
                        tags={tags}
                        modifier="Filter--info"
                        showCount={false}
                        filter={filter}/>
                </div>
                {viewLink}
            </footer>
        </section>
    );
}
