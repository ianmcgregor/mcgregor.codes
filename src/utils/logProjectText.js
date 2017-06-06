export default function(projects) {
    console.log(projects.reduce((str, p) => {
        if (p.text.length > 1) {
            console.error('LONG ' + p.title);
        }
        return `${str}${p.title}\n\n
            ${p.text.map(t => t.value).join('\n')}\n\n
            ${p.client.map(c => c.name).join(' / ')}\n\n\n\n`;
    }, ''));
}
