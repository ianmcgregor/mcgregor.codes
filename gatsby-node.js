require('isomorphic-fetch');
const path = require('path');
const fs = require('fs');
const sitemap = require('sitemap');
const pagePathname = require('./src/utils/page-pathname');
const snakeCase = require('snake-case');

exports.createPages = ({graphql, boundActionCreators}) => {
    const {createPage} = boundActionCreators;

    const create = (page, allPages, template) => {
        console.log('\n=> createPage', pagePathname(page.slug), page.id);
        return createPage({
            path: pagePathname(page.slug),
            component: path.resolve(`./src/templates/${template}.js`),
            context: {
                id: page.id,
                slug: page.slug,
                links: allPages.map(p => ({title: p.title, slug: p.slug}))
            }
        });
    };

    return new Promise(resolve => {
        graphql(`
            {
              pages: allContentfulPage {
                edges {
                  node {
                    id
                    slug
                    components {
                      ... on ContentfulProject {
                        id
                        title
                      }
                    }
                  }
                }
              }
            }
            `)
            .then(result => result.data.pages.edges.map(edge => edge.node))
            .then(pages => pages.reduce((acc, page) => {
                create(page, [], 'index');
                acc.push(page);

                const pageProjects = page.components
                    .filter(component => !!component.id)
                    .map(project => ({
                        ...project,
                        slug: snakeCase(project.title)
                    }));

                pageProjects.map(projectPage => create(projectPage, pageProjects, 'detail'));

                console.log('\n=> Created', pageProjects.length, 'project detail pages');

                return acc.concat(pageProjects);
            }, []))
            .then(pages => {
                if (process.env.NODE_ENV === 'production') {
                    return generateSiteMap(pages.map(p => pagePathname(p.slug)));
                }
                return pages;
            })
            .then(pages => {
                if (process.env.NODE_ENV === 'production' && process.env.CIRCLE_BRANCH === 'develop') {
                    return generateRobotsTxt();
                }
                return pages;
            })
            .then(() => resolve());
    });
};

function generateSiteMap(urls) {
    return new Promise(resolve => {
        console.log('Generating sitemap.xml');
        const sm = sitemap.createSitemap({
            hostname: 'https://mcgregor.codes',
            cacheTime: '60000',
            urls: urls
                .map(url => ({
                    url: url,
                    changefreq: 'daily',
                    priority: url ? 0.7 : 0.9
                }))
        });
        fs.writeFile(`${__dirname}/public/sitemap.xml`, sm.toString(), 'utf8', err => {
            if (err) {
                throw err;
            }
            resolve();
        });
    });
}

function generateRobotsTxt() {
    const txt = 'User-agent: *\nDisallow: /';
    return new Promise(resolve => {
        console.log('Generating robots.txt');
        fs.writeFile(`${__dirname}/public/robots.txt`, txt, 'utf8', err => {
            if (err) {
                throw err;
            }
            resolve();
        });
    });
}
