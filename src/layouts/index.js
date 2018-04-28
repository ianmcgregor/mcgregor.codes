import React from 'react';
import styled from 'styled-components';
import Header from '../components/header';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    width: 100%;
    min-height: 100vh;
    margin: 0 auto;
`;

export default ({
    children,
    data: {menu}
}) => (
    <Wrapper>
        <Header {...menu}/>
        {children()}
    </Wrapper>
);

export const query = graphql`
query LayoutQuery {
  menu: contentfulMenu {
    links {
      label
      url
    }
  }
}
`;
