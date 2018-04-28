const formatLink = require('./format-link');

module.exports = url => {
    const slug = (url || '').replace(/\//g, '');
    return formatLink(slug);
};
