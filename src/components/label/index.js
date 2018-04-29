import React from 'react';
import styled, {css} from 'styled-components';
import {
    boxCss,
    color,
    fontTitle
} from '../../styles';

const Wrapper = styled.div`
    margin: 0 5px;
`;

const Text = styled.h2`
    color: ${color.black};
    ${fontTitle};
    font-size: 16px;
    line-height: 21px;
    text-transform: uppercase;
`;

const Box = styled.span`
    ${boxCss}
`;

const arrowCss = css`
    &::${({arrow}) => arrow === 'left' ? 'before' : 'after'} {
        content: "➜";
        display: inline-block;
        margin-left: ${({arrow, empty}) => arrow === 'left' || empty ? 0 : 5}px;
        margin-right: ${({arrow, empty}) => arrow === 'left' && !empty ? 5 : 0}px;
        transform: ${({arrow}) => arrow === 'left' ? 'scaleX(-1)' : 'none'};
    }
`;

const Label = styled.span`
    ${({arrow}) => arrow ? arrowCss : ''}
`;

export default ({
    text,
    el,
    arrow
}) => {
    const TextComponent = !el || el === 'h2' ? Text : Text.withComponent(el);
    return (
        <Wrapper>
            <TextComponent>
                <Box>
                    <Label
                        arrow={arrow}
                        empty={!text}>
                        {text}
                    </Label>
                </Box>
            </TextComponent>
        </Wrapper>
    );
};
