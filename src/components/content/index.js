import React from 'react';
import styled from 'styled-components';
import Label from '../label';
import Text from '../text';
import {marginFixed, media} from '../../styles';

const Wrapper = styled.div`
    position: relative;
    width: 100%;
`;

const Title = styled.div`
    margin-bottom: ${marginFixed * 2}px;
    margin-top: ${marginFixed}px;

    ${media.tablet`
        margin-top: 0;
    `}
`;

export default ({
    title,
    text
}) => (
    <Wrapper>
        <Title>
            <Label text={title} el="h1"/>
        </Title>
        {text && (
            <Text text={text}/>
        )}
    </Wrapper>
);
