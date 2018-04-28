import React from 'react';
import styled from 'styled-components';
import Image from '../image';
import Video from '../video';
import Title from '../title';
import Link from 'gatsby-link';
import snakeCase from 'snake-case';
import pagePathname from '../../utils/page-pathname';

const Wrapper = styled.article`
    position: relative;
    width: 100%;
`;

export default ({
    title,
    image,
    video,
    link
}) => (
    <Wrapper>
        <Link to={pagePathname(snakeCase(title))}>
            {video && (
                <Video
                    video={video}
                    autoLoop
                />
            )}
            {!video && image && (
                <Image
                    image={image}
                />
            )}
        </Link>
        <Title
            title={title}
            link={link}
        />
    </Wrapper>
);
