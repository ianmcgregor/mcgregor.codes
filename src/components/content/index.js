import React from 'react';
import styled from 'styled-components';
import Label from '../label';
import Text from '../text';
import {marginFixed} from '../../styles';

const Wrapper = styled.div`
    position: relative;
    width: 100%;
`;

const Title = styled.div`
    margin-bottom: ${marginFixed * 2}px;
`;

export default ({
    title,
    text,
    first
}) => (
    <Wrapper>
        <Title>
            <Label text={title} el={first ? 'h1' : 'h2'}/>
        </Title>
        {text && (
            <Text text={text}/>
        )}
    </Wrapper>
);
