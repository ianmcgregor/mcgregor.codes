import React from 'react';
import styled from 'styled-components';

const FrameHolder = styled.div`
    position: relative;
    width: 100%;

    &::after {
        content: "";
        padding-bottom: 56.25%;
        display: block;
        width: 100%;
    }
`;

const IFrameComponent = styled.iframe`
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
`;

export default ({src}) => (
    <FrameHolder>
        <IFrameComponent
            src={src}
        />
    </FrameHolder>
);
