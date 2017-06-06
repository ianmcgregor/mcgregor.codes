import React from 'react';
import marked from 'marked';

const renderer = new marked.Renderer();
renderer.link = (href, title, text) => {
    const external = /^https?:\/\/.+$/.test(href);
    const target = external ? '_blank' : '_self';
    return `<a href="${href}" target="${target}" rel="nofollow">${text}</a>`;
};
marked.setOptions({renderer: renderer});

export default function markdown(content) {
    return <span dangerouslySetInnerHTML={{__html: marked(content)}} />;
}
