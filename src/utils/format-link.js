module.exports = slug => `/${slug || ''}/`.replace(/\/+/g, '/');
