import React from 'react';
import Helmet from 'react-helmet';

export default ({
    siteMetadata,
    settings,
    page
}) => {
    const siteURL = siteMetadata.url;
    const title = page.title ? `${settings.title} / ${page.title.toUpperCase()}` : settings.title;
    const description = page.description || settings.description;
    const image = `https:${(page.image && page.image.file.url) || settings.image.file.url}`;
    const favicon = settings.favicon.file.url;

    return (
        <Helmet title={title}>
            <html lang="en" />

            <meta name="description" content={description} />
            <meta name="image" content={image} />

            <meta property="og:url" content={siteURL} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content={settings.twitterHandle}/>
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            <link rel="sitemap" type="application/xml" href="/sitemap.xml"/>

            <link rel="apple-touch-icon" sizes="180x180" href={`${favicon}?w=180`}/>
            <link rel="icon" type="image/png" sizes="192x192" href={`${favicon}?w=192`}/>
            <link rel="icon" type="image/png" sizes="32x32" href={`${favicon}?w=32`}/>
        </Helmet>
    );
};
