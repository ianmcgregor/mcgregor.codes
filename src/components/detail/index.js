import React from 'react';
import styled from 'styled-components';
import Image from '../image';
import Video from '../video';
import Frame from '../frame';
import Title from '../title';
import Text from '../text';
import PrevNext from './prev-next';

const Wrapper = styled.article`
    position: relative;
    width: 100%;
`;

export default ({
    title,
    text,
    image,
    video,
    link,
    links,
    slug,
    iframe
}) => (
    <Wrapper>
        <PrevNext
            slug={slug}
            links={links}
        />
        {iframe && (
            <Frame
                src={iframe}
                frameBorder={0}
            />
        )}
        {!iframe && video && (
            <Video
                video={video}
                autoLoop
                playButton
            />
        )}
        {!iframe && !video && image && (
            <Image
                image={image}
            />
        )}
        <Title
            title={title}
            link={link}
            el="h1"
        />
        {text && (
            <Text text={text}/>
        )}

    </Wrapper>
);
