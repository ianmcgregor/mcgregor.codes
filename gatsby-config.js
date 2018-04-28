require('dotenv').config();

module.exports = {
    siteMetadata: {
        title: 'MCGREGOR CODES',
        url: 'https://mcgregor.codes'
    },
    plugins: [
        'gatsby-plugin-styled-components',
        'gatsby-plugin-react-helmet',
        'gatsby-transformer-remark',
        {
            resolve: 'gatsby-source-contentful',
            options: {
                spaceId: process.env.SPACE_ID,
                accessToken: !!process.env.IS_PREVIEW ? process.env.ACCESS_TOKEN_PREVIEW : process.env.ACCESS_TOKEN,
                host: !!process.env.IS_PREVIEW ? 'preview.contentful.com' : ''
            }
        }
    ]
};
