import React from 'react';
import Link from 'gatsby-link';
import Grid from '../components/grid';
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
import Label from '../components/label';
import Text from '../components/text';

const Main = styled.main`
    display: flex;
    flex-direction: column;
    width: 100%;

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

const List = styled.ul`
    display: flex;
    flex-wrap: wrap;
`;

const Item = styled.li`
    margin-right: 20px;
`;

export default ({
    data: {allSitePage}
}) => (
    <Main>
        <Section>
            <Label text="404 page not found" el="h1"/>
            <Text
                text="If you were trying to reach another page, perhaps you can find it below:"
            />
            <List>
                {allSitePage.edges
                    .map(({node}) => node)
                    .filter(({path}) => path.length > 1 && !path.includes('404'))
                    .map(({path}) => (
                        <Item key={path}>
                            <Link to={path}>
                                <Text text={path}/>
                            </Link>
                        </Item>)
                    )}
            </List>
        </Section>
        {process.env.NODE_ENV === 'development' && (
            <Grid show/>
        )}
    </Main>
);

export const pageQuery = graphql`
  query Page404 {
    allSitePage(filter: { path: { ne: "/dev-404-page/" } }) {
      totalCount
      edges {
        node {
          path
        }
      }
    }
  }
`;
