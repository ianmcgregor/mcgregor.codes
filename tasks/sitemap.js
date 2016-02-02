const sm = require('sitemap');
const fs = require('fs');

const sitemap = sm.createSitemap({
    hostname: 'http://mcgregor.codes',
    cacheTime: 600000, //600 sec (10 min) cache purge period
    urls: [{
        url: '/',
        changefreq: 'weekly',
        priority: 0.8,
        lastmodrealtime: true,
        lastmodfile: 'index.html'
    }, {
        url: '/projects',
        changefreq: 'weekly',
        priority: 0.8,
        lastmodrealtime: true,
        lastmodfile: 'projects/index.html'
    }, {
        url: '/services',
        changefreq: 'weekly',
        priority: 0.8,
        lastmodrealtime: true,
        lastmodfile: 'services/index.html'
    }, {
        url: '/contact',
        changefreq: 'weekly',
        priority: 0.8,
        lastmodrealtime: true,
        lastmodfile: 'contact/index.html'
    }]
});

fs.writeFileSync('sitemap.xml', sitemap.toString());
