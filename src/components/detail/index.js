import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';
import Image from '../image';
import Video from '../video';
import Frame from '../frame';
import Label from '../label';
import Title from '../title';
import Text from '../text';
import {linkCss, media, marginFixed} from '../../styles';
import pagePathname from '../../utils/page-pathname';

const Wrapper = styled.article`
    position: relative;
    width: 100%;
`;

const HideMobile = styled.span`
    display: none;
    ${media.tablet`
        display: block;
    `}
`;

const PrevNextLink = styled(Link)`
    ${linkCss}
`;

const PrevNextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: ${marginFixed * 2}px;

    ${media.tablet`
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
    `}
`;

const PrevNext = ({slug, links}) => {
    const index = links.indexOf(links.find(l => l.slug === slug));
    const prev = links[index - 1] || links[links.length - 1];
    const next = links[index + 1] || links[0];

    return (
        <PrevNextWrapper>
            <HideMobile>
                <PrevNextLink to={pagePathname(prev.slug)}>
                    <Label
                        arrow="left"
                        text={prev.title}
                        el="div"
                    />
                </PrevNextLink>
            </HideMobile>
            <PrevNextLink to={pagePathname(next.slug)}>
                <Label
                    arrow="right"
                    text={next.title}
                    el="div"
                />
            </PrevNextLink>
        </PrevNextWrapper>
    );
};

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
        />
        {text && (
            <Text text={text}/>
        )}

    </Wrapper>
);
