import React from 'react';
import Detail from '../components/detail';
import Debug from '../components/debug';
import Grid from '../components/grid';
import Seo from './seo';
import styled from 'styled-components';
import {
    media,
    marginMobile,
    columnMobile,
    marginTablet,
    columnTablet,
    marginDesktop,
    columnDesktop
} from '../styles';

const Main = styled.main`
    display: flex;
    flex-direction: column;
    width: 100%;
    opacity: 0;

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
        width: ${marginTablet + columnTablet * 2}%;
        margin: 0 0 0 ${marginTablet}%;
    `}

    ${media.desktop`
        width: ${marginDesktop * 3 + columnDesktop * 2}%;
        margin: 0 0 0 ${marginDesktop + columnDesktop}%;
    `}
`;

export default ({
    location,
    data: {
        site: {
            siteMetadata
        },
        settings,
        project
    },
    transition,
    pathContext: {
        slug,
        links
    }
}) => (
    <Main style={transition && transition.style}>
        <Seo
            settings={settings}
            siteMetadata={siteMetadata}
            page={project}
        />
        <Section id={project.id} data-component="Detail">
            <Detail
                {...project}
                links={links}
                slug={slug}
            />
        </Section>
        {process.env.NODE_ENV === 'development' && (
            <Debug
                id={project.id}
                site={siteMetadata}
                location={location}
                data={{links, slug, project}}
            />
        )}
        {process.env.NODE_ENV === 'development' && (
            <Grid/>
        )}
    </Main>
);

export const query = graphql`
query ProjectQuery($id: String!) {
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
  project: contentfulProject(id: {eq: $id}) {
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
}
`;
