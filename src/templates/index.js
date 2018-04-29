import React from 'react';
import components from '../components';
import Debug from '../components/debug';
import Grid from '../components/grid';
import styled from 'styled-components';
import {
    media,
    marginMobile,
    columnMobile,
    marginTablet,
    columnTablet,
    marginDesktop,
    columnDesktop,
    marginFixed
} from '../styles';
import Seo from './seo';

const Main = styled.main`
    display: flex;
    flex-direction: column;
    width: 100%;
    opacity: 0;
    padding-bottom: ${marginFixed}px;

    ${media.tablet`
        flex-direction: row;
        flex-wrap: wrap;
    `}
`;

const Section = styled.section`
    flex: none;
    width: ${columnMobile}%;
    margin: 0 0 0 ${marginMobile}%;

    ${media.tablet`
        width: ${columnTablet}%;
        margin: 0 0 0 ${marginTablet}%;
    `}

    ${media.desktop`
        width: ${columnDesktop}%;
        margin: 0 0 0 ${marginDesktop}%;
    `}
`;

export default ({
    location,
    data: {
        site: {
            siteMetadata
        },
        settings,
        page
    },
    transition
}) => (
    <Main style={transition && transition.style}>
        <Seo
            settings={settings}
            siteMetadata={siteMetadata}
            page={page}
        />
        {page.components.map((c, i) => {
            const type = c.type.replace('Contentful', '');
            const Module = components[type];
            if (!Module) {
                return null;
            }

            return (
                <Section id={c.id} data-component={type} key={type + c.id}>
                    <Module {...c} page={page} first={i === 0}/>
                </Section>
            );
        })}
        {process.env.NODE_ENV === 'development' && (
            <Debug
                id={page.id}
                site={siteMetadata}
                location={location}
                components={page.components}
            />
        )}
        {process.env.NODE_ENV === 'development' && (
            <Grid/>
        )}
    </Main>
);

export const query = graphql`
query PageQuery($id: String!) {
  site {
    siteMetadata {
      title
      url
    }
  }
  settings: contentfulSettings {
    title
    description
    twitterHandle
    image {
      ...ImageFragment
    }
    favicon {
      ...ImageFragment
    }
  }
  page: contentfulPage(id: {eq: $id}) {
    id
    slug
    title
    components {
      type: __typename
      ... on ContentfulProject {
        id
        title
        year
        image {
          ...ImageFragment
        }
        video {
          ...VideoFragment
        }
        text {
          childMarkdownRemark {
            html
          }
        }
        link
      }
      ... on ContentfulContent {
        id
        title
        text {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
}

fragment ImageFragment on ContentfulAsset {
  id
  title
  description
  resolutions {
    aspectRatio
    width
    height
    src
    srcSet
    srcWebp
    srcSetWebp
  }
  file {
    url
    fileName
    contentType
  }
  sizes(quality: 100) {
    aspectRatio
    src
    srcSet
    srcWebp
    srcSetWebp
    sizes
  }
  resize {
    src
    width
    height
    aspectRatio
  }
}

fragment VideoFragment on ContentfulAsset {
  id
  title
  description
  file {
    url
    fileName
    contentType
  }
}
`;
